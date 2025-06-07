-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "inProgress" BOOLEAN NOT NULL DEFAULT false;
