/*
  Warnings:

  - A unique constraint covering the columns `[tutorialCategoryId]` on the table `Tutorial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tutorialCategoryId` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tutorial" ADD COLUMN     "tutorialCategoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TutorialCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorialCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TutorialCategory_name_key" ON "TutorialCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TutorialCategory_slug_key" ON "TutorialCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tutorial_tutorialCategoryId_key" ON "Tutorial"("tutorialCategoryId");

-- AddForeignKey
ALTER TABLE "Tutorial" ADD CONSTRAINT "Tutorial_tutorialCategoryId_fkey" FOREIGN KEY ("tutorialCategoryId") REFERENCES "TutorialCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
