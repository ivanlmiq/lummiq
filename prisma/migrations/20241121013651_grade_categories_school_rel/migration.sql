/*
  Warnings:

  - Added the required column `schoolId` to the `GradeCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GradeCategory" ADD COLUMN     "schoolId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "GradeCategory_schoolId_idx" ON "GradeCategory"("schoolId");
