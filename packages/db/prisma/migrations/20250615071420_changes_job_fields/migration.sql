-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "companyName" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "position" TEXT NOT NULL DEFAULT 'Unknown';
