import { Injectable } from '@nestjs/common';
import { WorkOrderGateway } from 'src/Persistence/Dal/WorkOrder/workOrder.gateway';
import { DeleteWorkOrderUseCaseCommand } from './DeleteWorkOrderUseCase.command';

@Injectable()
export class DeleteWorkOrderUseCase {
  constructor(private readonly workOrderGateway: WorkOrderGateway) {}

  async run(command: DeleteWorkOrderUseCaseCommand): Promise<void> {
    await this.workOrderGateway.delete(command);
  }
}
