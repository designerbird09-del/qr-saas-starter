import { prisma } from "../config/db";
import { AppError } from "../utils/appError";
import { CreateQrInput, UpdateQrInput } from "../validators/qr.validator";

// short, URL-safe code for dynamic redirect links (/r/:shortCode)
function makeShortCode(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 7; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

export async function createQrCode(userId: string, input: CreateQrInput) {
  const isDynamic = input.isDynamic ?? false;

  const qr = await prisma.qRCode.create({
    data: {
      userId,
      name: input.name,
      type: input.type,
      isDynamic,
      targetValue: input.targetValue,
      shortCode: isDynamic ? makeShortCode() : null,
      folderId: input.folderId,
      design: input.design
        ? {
            create: {
              foregroundColor: input.design.foregroundColor,
              backgroundColor: input.design.backgroundColor,
              gradientStart: input.design.gradientStart,
              gradientEnd: input.design.gradientEnd,
              dotShape: input.design.dotShape,
              eyeStyle: input.design.eyeStyle,
              frameStyle: input.design.frameStyle,
              logoUrl: input.design.logoUrl,
              margin: input.design.margin,
              errorCorrection: input.design.errorCorrection,
              opacity: input.design.opacity,
            },
          }
        : { create: {} },
    },
    include: { design: true },
  });

  return qr;
}

export async function listQrCodes(userId: string, opts: { search?: string; folderId?: string; archived?: boolean }) {
  return prisma.qRCode.findMany({
    where: {
      userId,
      isArchived: opts.archived ?? false,
      folderId: opts.folderId,
      name: opts.search ? { contains: opts.search, mode: "insensitive" } : undefined,
    },
    include: { design: true, tags: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getQrCodeById(userId: string, id: string) {
  const qr = await prisma.qRCode.findFirst({
    where: { id, userId },
    include: { design: true, tags: true },
  });
  if (!qr) throw new AppError("QR code not found", 404);
  return qr;
}

export async function updateQrCode(userId: string, id: string, input: UpdateQrInput) {
  await getQrCodeById(userId, id); // ownership + existence check

  const qr = await prisma.qRCode.update({
    where: { id },
    data: {
      name: input.name,
      targetValue: input.targetValue,
      isActive: input.isActive,
      expiresAt: input.expiresAt ? new Date(input.expiresAt) : undefined,
      scanLimit: input.scanLimit,
      isFavorite: input.isFavorite,
      isArchived: input.isArchived,
      folderId: input.folderId,
      design: input.design
        ? {
            upsert: {
              create: { ...input.design },
              update: { ...input.design },
            },
          }
        : undefined,
    },
    include: { design: true },
  });

  return qr;
}

export async function deleteQrCode(userId: string, id: string) {
  await getQrCodeById(userId, id);
  await prisma.qRCode.delete({ where: { id } });
}

export async function duplicateQrCode(userId: string, id: string) {
  const original = await getQrCodeById(userId, id);
  return prisma.qRCode.create({
    data: {
      userId,
      name: `${original.name} (copy)`,
      type: original.type,
      isDynamic: original.isDynamic,
      targetValue: original.targetValue,
      shortCode: original.isDynamic ? makeShortCode() : null,
      folderId: original.folderId,
      design: original.design
        ? {
            create: {
              foregroundColor: original.design.foregroundColor,
              backgroundColor: original.design.backgroundColor,
              gradientStart: original.design.gradientStart,
              gradientEnd: original.design.gradientEnd,
              dotShape: original.design.dotShape,
              eyeStyle: original.design.eyeStyle,
              frameStyle: original.design.frameStyle,
              logoUrl: original.design.logoUrl,
              margin: original.design.margin,
              errorCorrection: original.design.errorCorrection,
              opacity: original.design.opacity,
            },
          }
        : undefined,
    },
    include: { design: true },
  });
}

// resolves a dynamic QR's short code to its live target, recording a scan
export async function resolveAndLogScan(shortCode: string, meta: { device?: string; browser?: string; os?: string; referrer?: string; ipHash?: string }) {
  const qr = await prisma.qRCode.findUnique({ where: { shortCode } });
  if (!qr) throw new AppError("QR code not found", 404);
  if (!qr.isActive) throw new AppError("This QR code has been paused", 410);
  if (qr.expiresAt && qr.expiresAt < new Date()) throw new AppError("This QR code has expired", 410);
  if (qr.scanLimit && qr.scanCount >= qr.scanLimit) throw new AppError("Scan limit reached", 410);

  await prisma.$transaction([
    prisma.qRCode.update({ where: { id: qr.id }, data: { scanCount: { increment: 1 } } }),
    prisma.scanLog.create({ data: { qrCodeId: qr.id, ...meta } }),
  ]);

  return qr.targetValue;
}
