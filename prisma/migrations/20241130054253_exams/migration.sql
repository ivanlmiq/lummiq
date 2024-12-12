/*
  Warnings:

  - Added the required column `schoolId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "schoolId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Exam_schoolId_idx" ON "Exam"("schoolId");
