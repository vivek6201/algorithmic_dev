/*
  Warnings:

  - You are about to drop the column `type` on the `Feedback` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'PRIVATE', 'SCHEDULED');

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Tutorial" ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "chapters" ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'DRAFT';

-- DropEnum
DROP TYPE "FeedbackType";

-- CreateTable
CREATE TABLE "Bug" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Bug_pkey" PRIMARY KEY ("id")
);
