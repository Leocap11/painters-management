import { Module } from '@nestjs/common';
import { DomainModule } from 'src/Domain/domain.module';
import { ClientController } from './Client/client.controller';
import { SupplierController } from './Supplier/supplier.controller';
import { WorkOrderController } from './WorkOrder/workOrder.controller';
import { WorkOrderMaterialController } from './WorkOrderMaterial/workOrderMaterial.controller';
import { MaterialController } from './Material/material.controller';
import { DashboardController } from './Dashboard/dashboard.controller';

const controllers = [
  ClientController,
  SupplierController,
  WorkOrderController,
  WorkOrderMaterialController,
  MaterialController,
  DashboardController
];

@Module({
  imports: [DomainModule],
  controllers: [...controllers]
})
export class ControllerModule {}
