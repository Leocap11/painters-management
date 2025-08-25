/*
  Warnings:

  - Added the required column `status` to the `WorkOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."WorkOrderStatus" AS ENUM ('IN_PROGRESS', 'CLOSED');

-- AlterTable
ALTER TABLE "public"."WorkOrder" ADD COLUMN     "status" "public"."WorkOrderStatus" NOT NULL;
