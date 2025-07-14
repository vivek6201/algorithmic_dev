-- AlterTable
ALTER TABLE "Jobs" ALTER COLUMN "companyName" DROP DEFAULT,
ALTER COLUMN "location" DROP DEFAULT,
ALTER COLUMN "position" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'User';

-- CreateIndex
CREATE INDEX "Jobs_slug_idx" ON "Jobs"("slug");

-- CreateIndex
CREATE INDEX "Jobs_published_idx" ON "Jobs"("published");
