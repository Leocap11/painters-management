/*
  Warnings:

  - You are about to drop the column `residence_address` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_issue_date` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the column `material_id` on the `WorkOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vat_number]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_code,supplier_id,name]` on the table `Material` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_invoice_sended` to the `WorkOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Client_residence_address_key";

-- DropIndex
DROP INDEX "public"."Material_product_code_key";

-- AlterTable
ALTER TABLE "public"."Client" DROP COLUMN "residence_address",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "vat_number" TEXT,
ALTER COLUMN "fiscal_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Material" ADD COLUMN     "supplier_id" TEXT;

-- AlterTable
ALTER TABLE "public"."WorkOrder" DROP COLUMN "invoice_issue_date",
DROP COLUMN "material_id",
ADD COLUMN     "is_invoice_sended" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "public"."Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vat_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "email" TEXT,
    "mobile_phone" TEXT,
    "telephone" TEXT,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_vat_number_key" ON "public"."Supplier"("vat_number");

-- CreateIndex
CREATE UNIQUE INDEX "Client_vat_number_key" ON "public"."Client"("vat_number");

-- CreateIndex
CREATE UNIQUE INDEX "Material_product_code_supplier_id_name_key" ON "public"."Material"("product_code", "supplier_id", "name");

-- AddForeignKey
ALTER TABLE "public"."Material" ADD CONSTRAINT "Material_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "public"."Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
