import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';
import { WorkOrderMaterialEntity } from '../../WorkOrderMaterial/entity/workOrderMaterial.entity';

export type WorkOrderEntity = PrismaPaintersEntities.WorkOrder & {
  Client: PrismaPaintersEntities.Client;
  WorkOrderMaterials: WorkOrderMaterialEntity[];
};

export type WorkOrderStatus = PrismaPaintersEntities.$Enums.WorkOrderStatus;
