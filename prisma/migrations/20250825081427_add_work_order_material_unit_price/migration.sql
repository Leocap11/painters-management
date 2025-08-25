/*
  Warnings:

  - You are about to drop the `_WorkOrderMaterials` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "public"."WorkOrderStatus" ADD VALUE 'CREATED';

-- DropForeignKey
ALTER TABLE "public"."_WorkOrderMaterials" DROP CONSTRAINT "_WorkOrderMaterials_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_WorkOrderMaterials" DROP CONSTRAINT "_WorkOrderMaterials_B_fkey";

-- AlterTable
ALTER TABLE "public"."WorkOrder" ALTER COLUMN "is_invoice_sended" SET DEFAULT false;

-- DropTable
DROP TABLE "public"."_WorkOrderMaterials";

-- CreateTable
CREATE TABLE "public"."WorkOrderMaterial" (
    "id" TEXT NOT NULL,
    "workOrder_id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "square_meters" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WorkOrderMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderMaterial_workOrder_id_material_id_key" ON "public"."WorkOrderMaterial"("workOrder_id", "material_id");

-- AddForeignKey
ALTER TABLE "public"."WorkOrderMaterial" ADD CONSTRAINT "WorkOrderMaterial_workOrder_id_fkey" FOREIGN KEY ("workOrder_id") REFERENCES "public"."WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkOrderMaterial" ADD CONSTRAINT "WorkOrderMaterial_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "public"."Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
