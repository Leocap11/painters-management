import { Injectable } from '@nestjs/common';
import { WorkOrderMaterialGateway } from 'src/Persistence/Dal/WorkOrderMaterial/workOrderMaterial.gateway';
import { CreateWorkOrderMaterialUseCaseCommand } from './CreateWorkOrderMaterialUseCase.command';
import { WorkOrderMaterial } from '../../model/workOrderMaterial.model';
import { GetWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/GetWorkOrderUseCase/GetWorkOrderUseCase';
import { UpdateWorkOrderUseCase } from 'src/Domain/WorkOrder/useCase/UpdateWorkOrderUseCase/UpdateWorkOrderUseCase';

@Injectable()
export class CreateWorkOrderMaterialUseCase {
  constructor(
    private readonly workOrderMaterialGateway: WorkOrderMaterialGateway,
    private readonly getWorkOrderUseCase: GetWorkOrderUseCase,
    private readonly updateWorkOrderUseCase: UpdateWorkOrderUseCase
  ) {}

  async run(
    command: CreateWorkOrderMaterialUseCaseCommand
  ): Promise<WorkOrderMaterial> {
    const workOrderMaterial =
      await this.workOrderMaterialGateway.create(command);

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
      id: command.workOrderId,
      data: { netWorkCost, totalVatCost }
    });

    return workOrderMaterial;
  }
}
