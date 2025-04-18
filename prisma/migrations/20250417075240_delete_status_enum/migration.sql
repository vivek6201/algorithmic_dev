/*
  Warnings:

  - You are about to drop the column `status` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "status",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "BlogCategoryStatus";
