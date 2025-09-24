import { Injectable } from '@nestjs/common';
import { SupplierGateway } from 'src/Persistence/Dal/Supplier/supplier.gateway';
import { Supplier } from '../../model/supplier.model';
import { CreateSupplierUseCaseCommand } from './CreateSupplierUseCase.command';

@Injectable()
export class CreateSupplierUseCase {
  constructor(private readonly supplierGateway: SupplierGateway) {}

  async run(command: CreateSupplierUseCaseCommand): Promise<Supplier> {
    return await this.supplierGateway.create(command);
  }
}
