import { Injectable } from '@nestjs/common';
import { SupplierGateway } from 'src/Persistence/Dal/Supplier/supplier.gateway';
import { UpdateSupplierUseCaseCommand } from './UpdateSupplierUseCase.command';
import { Supplier } from '../../model/supplier.model';

@Injectable()
export class UpdateSupplierUseCase {
  constructor(private readonly supplierGateway: SupplierGateway) {}

  async run(command: UpdateSupplierUseCaseCommand): Promise<Supplier> {
    return await this.supplierGateway.update(command);
  }
}
