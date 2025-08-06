import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';

export type ClientEntity = PrismaPaintersEntities.Client & {
  WorkOrders: PrismaPaintersEntities.WorkOrder[];
};
