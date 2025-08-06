import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';
import { SupplierEntity } from '../../Supplier/entity/supplier.entity';

export type MaterialEntity = PrismaPaintersEntities.Material & {
  Supplier?: SupplierEntity;
};
