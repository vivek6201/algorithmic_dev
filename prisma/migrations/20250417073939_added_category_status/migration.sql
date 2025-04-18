/*
  Warnings:

  - Added the required column `status` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BlogCategoryStatus" AS ENUM ('Draft', 'Published');

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "status" "BlogCategoryStatus" NOT NULL;
