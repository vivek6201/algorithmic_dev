/*
  Warnings:

  - Added the required column `currentlyEnrolled` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "currentlyEnrolled" BOOLEAN NOT NULL;
