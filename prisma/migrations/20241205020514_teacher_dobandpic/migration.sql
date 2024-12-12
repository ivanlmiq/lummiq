/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Teacher_subjectId_idx";

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "subjectId",
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "photo" TEXT;

-- CreateTable
CREATE TABLE "_SubjectToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToTeacher_AB_unique" ON "_SubjectToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToTeacher_B_index" ON "_SubjectToTeacher"("B");
