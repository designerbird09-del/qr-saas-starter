import bcrypt from "bcryptjs";
import { prisma } from "../config/db";
import { AppError } from "../utils/appError";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { RegisterInput, LoginInput } from "../validators/auth.validator";

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new AppError("An account with this email already exists", 409);
  }
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: { email: input.email, passwordHash, name: input.name },
  });
  return issueTokens(user.id, user.email, user.planTier);
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new AppError("Invalid email or password", 401);

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw new AppError("Invalid email or password", 401);

  return issueTokens(user.id, user.email, user.planTier);
}

function issueTokens(userId: string, email: string, planTier: string) {
  const accessToken = signAccessToken({ userId, email, planTier });
  const refreshToken = signRefreshToken(userId);
  return {
    accessToken,
    refreshToken,
    user: { id: userId, email, planTier },
  };
}
