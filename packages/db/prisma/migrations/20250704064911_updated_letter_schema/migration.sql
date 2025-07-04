/*
  Warnings:

  - Added the required column `letterType` to the `NewsletterSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NewsletterSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LetterType" AS ENUM ('Blogs', 'Jobs');

-- AlterTable
ALTER TABLE "NewsletterSubscription" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "letterType" "LetterType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
