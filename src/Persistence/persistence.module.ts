import { Module } from '@nestjs/common';
import { PaintersManagementService } from './Clients/Prisma/PrismaPaintersManagementClient';

const persistence = [];

@Module({
  imports: [],
  providers: [PaintersManagementService, ...persistence],

  exports: [...persistence]
})
export class PersistenceModule {}
