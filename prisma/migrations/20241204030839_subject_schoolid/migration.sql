/*
  Warnings:

  - Added the required column `schoolId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "schoolId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Subject_schoolId_idx" ON "Subject"("schoolId");
