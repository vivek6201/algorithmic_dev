/*
  Warnings:

  - You are about to drop the column `employerProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_employerProfileId_key";

-- DropIndex
DROP INDEX "User_profileId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "employerProfileId",
DROP COLUMN "profileId";
