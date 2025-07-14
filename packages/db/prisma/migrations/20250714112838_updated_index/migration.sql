-- DropIndex
DROP INDEX "Jobs_published_idx";

-- DropIndex
DROP INDEX "Jobs_slug_idx";

-- CreateIndex
CREATE INDEX "Jobs_slug_published_type_createdAt_idx" ON "Jobs"("slug", "published", "type", "createdAt" DESC);
