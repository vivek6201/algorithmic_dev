-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "currentlyEnrolled" SET DEFAULT false;
