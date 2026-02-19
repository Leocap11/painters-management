-- DropForeignKey
ALTER TABLE "public"."Material" DROP CONSTRAINT "Material_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkOrderMaterial" DROP CONSTRAINT "WorkOrderMaterial_material_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."WorkOrderMaterial" DROP CONSTRAINT "WorkOrderMaterial_workOrder_id_fkey";

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderMaterial" ADD CONSTRAINT "WorkOrderMaterial_workOrder_id_fkey" FOREIGN KEY ("workOrder_id") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderMaterial" ADD CONSTRAINT "WorkOrderMaterial_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;
