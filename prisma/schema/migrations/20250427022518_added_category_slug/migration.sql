/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `JobCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `JobCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobCategory" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "JobCategory_slug_key" ON "JobCategory"("slug");
