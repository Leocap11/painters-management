-- CreateTable
CREATE TABLE "public"."Client" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "fiscal_code" TEXT NOT NULL,
    "mobile_phone" TEXT,
    "telephone" TEXT,
    "residence_address" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Material" (
    "id" TEXT NOT NULL,
    "product_code" TEXT,
    "name" TEXT NOT NULL,
    "cost_per_square_meter" DOUBLE PRECISION NOT NULL,
    "instructions_for_use" TEXT,
    "vat_percentage" INTEGER NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WorkOrder" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "material_id" TEXT[],
    "net_work_cost" DOUBLE PRECISION NOT NULL,
    "total_vat_cost" DOUBLE PRECISION NOT NULL,
    "final_cost" DOUBLE PRECISION NOT NULL,
    "start_work_date" TIMESTAMP(3) NOT NULL,
    "end_work_date" TIMESTAMP(3) NOT NULL,
    "invoice_issue_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_WorkOrderMaterials" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_WorkOrderMaterials_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_fiscal_code_key" ON "public"."Client"("fiscal_code");

-- CreateIndex
CREATE UNIQUE INDEX "Client_mobile_phone_key" ON "public"."Client"("mobile_phone");

-- CreateIndex
CREATE UNIQUE INDEX "Client_telephone_key" ON "public"."Client"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Client_residence_address_key" ON "public"."Client"("residence_address");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "public"."Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Material_product_code_key" ON "public"."Material"("product_code");

-- CreateIndex
CREATE INDEX "_WorkOrderMaterials_B_index" ON "public"."_WorkOrderMaterials"("B");

-- AddForeignKey
ALTER TABLE "public"."WorkOrder" ADD CONSTRAINT "WorkOrder_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_WorkOrderMaterials" ADD CONSTRAINT "_WorkOrderMaterials_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_WorkOrderMaterials" ADD CONSTRAINT "_WorkOrderMaterials_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
