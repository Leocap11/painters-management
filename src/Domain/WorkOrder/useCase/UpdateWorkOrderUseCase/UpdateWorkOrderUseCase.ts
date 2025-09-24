import { Injectable } from '@nestjs/common';
import { WorkOrderGateway } from 'src/Persistence/Dal/WorkOrder/workOrder.gateway';
import { UpdateWorkOrderUseCaseCommand } from './UpdateWorkOrderUseCase.command';
import { WorkOrder } from '../../model/workOrder.model';

@Injectable()
export class UpdateWorkOrderUseCase {
  constructor(private readonly workOrderGateway: WorkOrderGateway) {}

  async run(command: UpdateWorkOrderUseCaseCommand): Promise<WorkOrder> {
    return await this.workOrderGateway.update(command);
  }
}
