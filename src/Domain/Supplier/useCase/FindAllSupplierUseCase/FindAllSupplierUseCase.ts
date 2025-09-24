import { Injectable } from '@nestjs/common';
import { SupplierGateway } from 'src/Persistence/Dal/Supplier/supplier.gateway';
import { FindAllSupplierUseCaseCommand } from './FindAllSupplierUseCase.command';
import { Paged } from 'src/shared/utils/utils';
import { Supplier } from '../../model/supplier.model';

@Injectable()
export class FindAllSupplierUseCase {
  constructor(private readonly supplierGateway: SupplierGateway) {}

  async run(
    command: FindAllSupplierUseCaseCommand
  ): Promise<Paged<Supplier[]>> {
    return await this.supplierGateway.findAll(command);
  }
}
