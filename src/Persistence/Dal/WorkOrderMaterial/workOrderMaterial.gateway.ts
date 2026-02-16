import { Injectable } from '@nestjs/common';
import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';
import {
  CreateWorkOrderMaterialInput,
  UpdateWorkOrderMaterialInput,
  WorkOrderMaterialPersistencePort
} from './port/workOrderMaterial.port';
import { WorkOrderMaterial } from 'src/Domain/WorkOrderMaterial/model/workOrderMaterial.model';
import { FromWorkOrderMaterialEntityToWorkOrderMaterialModel } from './mapper/workOrderMaterial.mapper';
import { PaintersManagementService } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementClient';

@Injectable()
export class WorkOrderMaterialGateway
  implements WorkOrderMaterialPersistencePort {
  constructor(private readonly prisma: PaintersManagementService) { }
  private readonly include = { Material: true, WorkOrder: true } satisfies PrismaPaintersEntities.Prisma.WorkOrderMaterialInclude;

  async create(
    input: CreateWorkOrderMaterialInput
  ): Promise<WorkOrderMaterial> {
    const workOrderMaterial = await this.prisma.workOrderMaterial.create({
      include: this.include,
      data: {
        unitPrice: input.unitPrice,
        material_id: input.materialId,
        workOrder_id: input.workOrderId,
        square_meters: input.squareMeters
      }
    });

    return FromWorkOrderMaterialEntityToWorkOrderMaterialModel(
      workOrderMaterial
    );
  }

  async update(
    input: UpdateWorkOrderMaterialInput
  ): Promise<WorkOrderMaterial> {
    const workOrderMaterial = await this.prisma.workOrderMaterial.update({
      include: this.include,
      where: { id: input.id },
      data: {
        unitPrice: input.data.unitPrice,
        material_id: input.data.materialId,
        square_meters: input.data.squareMeters
      }
    });

    return FromWorkOrderMaterialEntityToWorkOrderMaterialModel(
      workOrderMaterial
    );
  }

  async delete(input: { id: string }): Promise<void> {
    await this.prisma.workOrderMaterial.delete({
      where: { id: input.id }
    });
  }
}
