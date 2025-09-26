import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';

export type WorkOrderMaterialEntity =
  PrismaPaintersEntities.WorkOrderMaterial & {
    Material: PrismaPaintersEntities.Material;
  };
