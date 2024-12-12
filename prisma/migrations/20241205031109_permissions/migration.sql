-- CreateEnum
CREATE TYPE "Action" AS ENUM ('READ', 'CREATE', 'UPDATE', 'DELETE', 'ALL');

-- CreateTable
CREATE TABLE "TeacherPermission" (
    "id" TEXT NOT NULL,
    "schema" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "role" "TeacherRole" NOT NULL,
    "schoolId" TEXT NOT NULL,
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherPermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TeacherPermission_teacherId_idx" ON "TeacherPermission"("teacherId");

-- CreateIndex
CREATE INDEX "TeacherPermission_schoolId_idx" ON "TeacherPermission"("schoolId");
