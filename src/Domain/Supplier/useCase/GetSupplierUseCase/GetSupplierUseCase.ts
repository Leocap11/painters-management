import { Injectable } from '@nestjs/common';
import { SupplierGateway } from 'src/Persistence/Dal/Supplier/supplier.gateway';
import { GetSupplierUseCaseCommand } from './GetSupplierUseCase.command';
import { Supplier } from '../../model/supplier.model';

@Injectable()
export class GetSupplierUseCase {
  constructor(private readonly supplierGateway: SupplierGateway) {}

  async run(command: GetSupplierUseCaseCommand): Promise<Supplier | null> {
    return await this.supplierGateway.getOne(command);
  }
}
