import { Module } from '@nestjs/common';
import { PaintersManagementService } from './Clients/Prisma/PrismaPaintersManagementClient';
import { WorkOrderGateway } from './Dal/WorkOrder/workOrder.gateway';
import { WorkOrderMaterialGateway } from './Dal/WorkOrderMaterial/workOrderMaterial.gateway';
import { SupplierGateway } from './Dal/Supplier/supplier.gateway';
import { ClientGateway } from './Dal/Client/client.gateway';
import { MaterialGateway } from './Dal/Material/material.gateway';

const persistence = [
  WorkOrderGateway,
  WorkOrderMaterialGateway,
  SupplierGateway,
  MaterialGateway,
  ClientGateway
];

@Module({
  imports: [],
  providers: [PaintersManagementService, ...persistence],

  exports: [...persistence]
})
export class PersistenceModule {}
