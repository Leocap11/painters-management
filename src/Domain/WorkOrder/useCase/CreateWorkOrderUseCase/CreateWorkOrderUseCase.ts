import { Injectable } from '@nestjs/common';
import { WorkOrderGateway } from 'src/Persistence/Dal/WorkOrder/workOrder.gateway';
import { CreateWorkOrderUseCaseCommand } from './CreateWorkOrderUseCase.command';
import { WorkOrder } from 'src/Domain/WorkOrder/model/workOrder.model';
import { GetMaterialUseCase } from 'src/Domain/Material/useCase/GetMaterialUseCase/GetMaterialUseCase';

@Injectable()
export class CreateWorkOrderUseCase {
  constructor(
    private readonly workOrderGateway: WorkOrderGateway,
    private readonly getMaterialUseCase: GetMaterialUseCase
  ) {}

  async run(command: CreateWorkOrderUseCaseCommand): Promise<WorkOrder> {
    let netWorkCost = 0;
    let totalVatCost = 0;

    for (const wm of command.workOrderMaterials) {
      const material = await this.getMaterialUseCase.run({ id: wm.materialId });
      const netCost = wm.unitPrice * wm.squareMeters;
      const vatCost = netCost * (material.vatPercentage / 100);

      netWorkCost += netCost;
      totalVatCost += vatCost;
    }

    return await this.workOrderGateway.create({
      ...command,
      netWorkCost,
      totalVatCost
    });
  }
}
