-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "chapterSlug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "Tutorial_title_createdAt_idx" ON "Tutorial"("title", "createdAt" DESC);
