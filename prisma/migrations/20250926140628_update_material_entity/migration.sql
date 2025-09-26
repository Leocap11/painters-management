/*
  Warnings:

  - You are about to drop the column `instructions_for_use` on the `Material` table. All the data in the column will be lost.
  - Made the column `supplier_id` on table `Material` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Material" DROP CONSTRAINT "Material_supplier_id_fkey";

-- AlterTable
ALTER TABLE "public"."Material" DROP COLUMN "instructions_for_use",
ADD COLUMN     "note" TEXT,
ALTER COLUMN "supplier_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Material" ADD CONSTRAINT "Material_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "public"."Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
