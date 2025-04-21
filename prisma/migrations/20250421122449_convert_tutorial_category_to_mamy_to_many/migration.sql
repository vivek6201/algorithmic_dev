/*
  Warnings:

  - You are about to drop the column `tutorialCategoryId` on the `Tutorial` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tutorial" DROP CONSTRAINT "Tutorial_tutorialCategoryId_fkey";

-- DropIndex
DROP INDEX "Tutorial_tutorialCategoryId_key";

-- AlterTable
ALTER TABLE "Tutorial" DROP COLUMN "tutorialCategoryId";

-- CreateTable
CREATE TABLE "TutorialCategoryOnTutorial" (
    "tutorialId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorialCategoryOnTutorial_pkey" PRIMARY KEY ("tutorialId","categoryId")
);

-- CreateIndex
CREATE INDEX "TutorialCategoryOnTutorial_tutorialId_categoryId_idx" ON "TutorialCategoryOnTutorial"("tutorialId", "categoryId");

-- AddForeignKey
ALTER TABLE "TutorialCategoryOnTutorial" ADD CONSTRAINT "TutorialCategoryOnTutorial_tutorialId_fkey" FOREIGN KEY ("tutorialId") REFERENCES "Tutorial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorialCategoryOnTutorial" ADD CONSTRAINT "TutorialCategoryOnTutorial_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TutorialCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
