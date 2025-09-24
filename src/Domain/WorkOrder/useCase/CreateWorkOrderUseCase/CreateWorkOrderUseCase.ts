import { Injectable } from '@nestjs/common';
import { WorkOrderGateway } from 'src/Persistence/Dal/WorkOrder/workOrder.gateway';
import { CreateWorkOrderUseCaseCommand } from './CreateWorkOrderUseCase.command';
import { WorkOrder } from 'src/Domain/WorkOrder/model/workOrder.model';

@Injectable()
export class CreateWorkOrderUseCase {
  constructor(private readonly workOrderGateway: WorkOrderGateway) {}

  async run(command: CreateWorkOrderUseCaseCommand): Promise<WorkOrder> {
    return await this.workOrderGateway.create(command);
  }
}
