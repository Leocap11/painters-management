import { Injectable } from '@nestjs/common';
import { WorkOrderMaterialGateway } from 'src/Persistence/Dal/WorkOrderMaterial/workOrderMaterial.gateway';
import { DeleteWorkOrderMaterialUseCaseCommand } from './DeleteWorkOrderMaterialUseCase.command';
import { GetWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/GetWorkOrderUseCase/GetWorkOrderUseCase';
import { UpdateWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/UpdateWorkOrderUseCase/UpdateWorkOrderUseCase';

@Injectable()
export class DeleteWorkOrderMaterialUseCase {
  constructor(
    private readonly workOrderMaterialGateway: WorkOrderMaterialGateway,
    private readonly getWorkOrderUseCase: GetWorkOrderUseCase,
    private readonly updateWorkOrderUseCase: UpdateWorkOrderUseCase
  ) {}

  async run(command: DeleteWorkOrderMaterialUseCaseCommand): Promise<void> {
    await this.workOrderMaterialGateway.delete(command);

    const workOrder = await this.getWorkOrderUseCase.run({
      id: command.workOrderId
    });

    let netWorkCost = 0;
    let totalVatCost = 0;

    for (const wm of workOrder.WorkOrderMaterials) {
      const material = wm.Material;
      const netCost = wm.unitPrice * wm.squareMeters;
      const vatCost = netCost * (material.vatPercentage / 100);

      netWorkCost += netCost;
      totalVatCost += vatCost;
    }

    await this.updateWorkOrderUseCase.run({
      id: workOrder.id,
      data: { netWorkCost, totalVatCost }
    });
  }
}
