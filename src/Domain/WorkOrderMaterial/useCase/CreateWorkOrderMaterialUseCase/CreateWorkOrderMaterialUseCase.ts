import { Injectable } from '@nestjs/common';
import { WorkOrderMaterialGateway } from 'src/Persistence/Dal/WorkOrderMaterial/workOrderMaterial.gateway';
import { CreateWorkOrderMaterialUseCaseCommand } from './CreateWorkOrderMaterialUseCase.command';
import { WorkOrderMaterial } from '../../model/workOrderMaterial.model';

@Injectable()
export class CreateWorkOrderMaterialUseCase {
  constructor(
    private readonly workOrderMaterialGateway: WorkOrderMaterialGateway
  ) {}

  async run(
    command: CreateWorkOrderMaterialUseCaseCommand
  ): Promise<WorkOrderMaterial> {
    return await this.workOrderMaterialGateway.create(command);
  }
}
