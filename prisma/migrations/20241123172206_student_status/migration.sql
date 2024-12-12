-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'GRADUATED', 'TRANSFERRED');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "studentStatus" "StudentStatus" NOT NULL DEFAULT 'ACTIVE';
