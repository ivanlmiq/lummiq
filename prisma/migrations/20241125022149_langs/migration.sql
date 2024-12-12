-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('THEORY', 'PRACTICAL');

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "internalIdPrefix" TEXT;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "code" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "status" "RowStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "type" "SubjectType" NOT NULL DEFAULT 'THEORY';

-- CreateTable
CREATE TABLE "Languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iso" TEXT NOT NULL,
    "flag" TEXT DEFAULT '',
    "status" "RowStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Languages_name_key" ON "Languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Languages_iso_key" ON "Languages"("iso");
