-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "QRType" ADD VALUE 'EVENT';
ALTER TYPE "QRType" ADD VALUE 'CALENDAR';
ALTER TYPE "QRType" ADD VALUE 'APP_DOWNLOAD';
ALTER TYPE "QRType" ADD VALUE 'INSTAGRAM';
ALTER TYPE "QRType" ADD VALUE 'FACEBOOK';
ALTER TYPE "QRType" ADD VALUE 'X';
ALTER TYPE "QRType" ADD VALUE 'LINKEDIN';
ALTER TYPE "QRType" ADD VALUE 'YOUTUBE';
ALTER TYPE "QRType" ADD VALUE 'TELEGRAM';
ALTER TYPE "QRType" ADD VALUE 'DISCORD';
ALTER TYPE "QRType" ADD VALUE 'PAYPAL';
ALTER TYPE "QRType" ADD VALUE 'STRIPE';
ALTER TYPE "QRType" ADD VALUE 'PDF';
ALTER TYPE "QRType" ADD VALUE 'IMAGE';
ALTER TYPE "QRType" ADD VALUE 'VIDEO';
ALTER TYPE "QRType" ADD VALUE 'MULTI_LINK';
