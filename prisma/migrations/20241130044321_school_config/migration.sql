-- AlterTable
ALTER TABLE "School" ADD COLUMN     "configId" TEXT;

-- CreateTable
CREATE TABLE "SchoolConfiguration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "allowStudentsUploadFiles" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "School_configId_idx" ON "School"("configId");
