import { Injectable } from '@nestjs/common';
import { WorkOrderGateway } from 'src/Persistence/Dal/WorkOrder/workOrder.gateway';
import { WorkOrder } from '../../model/workOrder.model';
import { GetWorkOrderUseCaseCommand } from './GetWorkOrderUseCase.command';

@Injectable()
export class GetWorkOrderUseCase {
  constructor(private readonly workOrderGateway: WorkOrderGateway) {}

  async run(command: GetWorkOrderUseCaseCommand): Promise<WorkOrder> {
    return await this.workOrderGateway.getOne(command);
  }
}
