import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';

export type WorkOrderEntity = PrismaPaintersEntities.WorkOrder & {
  Client: PrismaPaintersEntities.Client;
  WorkOrderMaterials: (PrismaPaintersEntities.WorkOrderMaterial & {
    Material: PrismaPaintersEntities.Material;
  })[];
};

export type WorkOrderStatus = PrismaPaintersEntities.$Enums.WorkOrderStatus;
