import { Injectable } from '@nestjs/common';
import { WorkOrder } from 'src/Domain/WorkOrder/model/workOrder.model';
import { WorkOrderGateway } from 'src/Persistence/Dal/WorkOrder/workOrder.gateway';
import { FindAllWorkOrderUseCaseCommand } from './FindAllWorkOrderUseCase.command';
import { Paged } from 'src/shared/utils/utils';

@Injectable()
export class FindAllWorkOrderUseCase {
  constructor(private readonly workOrderGateway: WorkOrderGateway) {}

  async run(
    command: FindAllWorkOrderUseCaseCommand
  ): Promise<Paged<WorkOrder[]>> {
    return await this.workOrderGateway.findAll(command);
  }
}
