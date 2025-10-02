import { Injectable } from '@nestjs/common';
import { WorkOrderMaterialGateway } from 'src/Persistence/Dal/WorkOrderMaterial/workOrderMaterial.gateway';
import { UpdateWorkOrderMaterialUseCaseCommand } from './UpdateWorkOrderMaterialUseCase.command';
import { WorkOrderMaterial } from '../../model/workOrderMaterial.model';
import { UpdateWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/UpdateWorkOrderUseCase/UpdateWorkOrderUseCase';
import { GetWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/GetWorkOrderUseCase/GetWorkOrderUseCase';

@Injectable()
export class UpdateWorkOrderMaterialUseCase {
  constructor(
    private readonly workOrderMaterialGateway: WorkOrderMaterialGateway,
    private readonly getWorkOrderUseCase: GetWorkOrderUseCase,
    private readonly updateWorkOrderUseCase: UpdateWorkOrderUseCase
  ) {}

  async run(
    command: UpdateWorkOrderMaterialUseCaseCommand
  ): Promise<WorkOrderMaterial> {
    const workOrderMaterial =
      await this.workOrderMaterialGateway.update(command);

    const workOrder = await this.getWorkOrderUseCase.run({
      id: workOrderMaterial.workOrderId
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
      id: workOrderMaterial.workOrderId,
      data: { netWorkCost, totalVatCost }
    });

    return workOrderMaterial;
  }
}
