-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "currentlyWorking" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "endDate" DROP NOT NULL;
