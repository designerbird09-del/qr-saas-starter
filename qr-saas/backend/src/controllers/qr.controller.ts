import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { AppError } from "../utils/appError";
import { createQrSchema, updateQrSchema } from "../validators/qr.validator";
import {
  createQrCode, listQrCodes, getQrCodeById, updateQrCode, deleteQrCode, duplicateQrCode,
} from "../services/qr.service";
import { buildPayload, generateQrPngDataUrl } from "../services/qrGenerator.service";

export const createQr = catchAsync(async (req: Request, res: Response) => {
  const input = createQrSchema.parse(req.body);
  const qr = await createQrCode(req.user!.userId, input);
  sendSuccess(res, qr, 201);
});

export const listQr = catchAsync(async (req: Request, res: Response) => {
  const { search, folderId, archived } = req.query;
  const qrs = await listQrCodes(req.user!.userId, {
    search: search as string | undefined,
    folderId: folderId as string | undefined,
    archived: archived === "true",
  });
  sendSuccess(res, qrs);
});

export const getQr = catchAsync(async (req: Request, res: Response) => {
  const qr = await getQrCodeById(req.user!.userId, req.params.id);
  sendSuccess(res, qr);
});

export const updateQr = catchAsync(async (req: Request, res: Response) => {
  const input = updateQrSchema.parse(req.body);
  const qr = await updateQrCode(req.user!.userId, req.params.id, input);
  sendSuccess(res, qr);
});

export const deleteQr = catchAsync(async (req: Request, res: Response) => {
  await deleteQrCode(req.user!.userId, req.params.id);
  sendSuccess(res, { deleted: true });
});

export const duplicateQr = catchAsync(async (req: Request, res: Response) => {
  const qr = await duplicateQrCode(req.user!.userId, req.params.id);
  sendSuccess(res, qr, 201);
});

// Renders a QR (PNG data URL) for a given type/value/design without persisting it.
// Used by the live builder for instant preview and by the "download" action.
export const renderQr = catchAsync(async (req: Request, res: Response) => {
  const { type, value, foregroundColor, backgroundColor, margin, errorCorrection } = req.body;
  if (!type || !value) throw new AppError("type and value are required", 422);

  const payload = buildPayload(type, value);
  const dataUrl = await generateQrPngDataUrl(payload, { foregroundColor, backgroundColor, margin, errorCorrection });
  sendSuccess(res, { dataUrl });
});
