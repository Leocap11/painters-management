import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';
import { MaterialEntity } from '../../Material/entity/material.entity';

export type WorkOrderMaterialEntity =
  PrismaPaintersEntities.WorkOrderMaterial & {
    Material: MaterialEntity;
  };
