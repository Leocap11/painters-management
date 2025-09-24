import { Injectable } from '@nestjs/common';
import { SupplierGateway } from 'src/Persistence/Dal/Supplier/supplier.gateway';
import { DeleteSupplierUseCaseCommand } from './DeleteSupplierUseCase.command';

@Injectable()
export class DeleteSupplierUseCase {
  constructor(private readonly supplierGateway: SupplierGateway) {}

  async run(command: DeleteSupplierUseCaseCommand): Promise<void> {
    await this.supplierGateway.delete(command);
  }
}
