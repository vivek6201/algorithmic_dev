-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('Bug', 'Suggestions', 'General');

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "type" "FeedbackType" NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
