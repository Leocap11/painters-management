import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';
import { ClientEntity } from '../../Client/entity/client.entity';
import { MaterialEntity } from '../../Material/entity/material.entity';

export type WorkOrderEntity = PrismaPaintersEntities.WorkOrder & {
  Client: Omit<ClientEntity, 'WorkOrders'>;
  Materials: MaterialEntity[];
};
