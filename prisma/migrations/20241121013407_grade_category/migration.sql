/*
  Warnings:

  - Added the required column `gradeCategoryId` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "gradeCategoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GradeCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GradeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Grade_gradeCategoryId_idx" ON "Grade"("gradeCategoryId");
