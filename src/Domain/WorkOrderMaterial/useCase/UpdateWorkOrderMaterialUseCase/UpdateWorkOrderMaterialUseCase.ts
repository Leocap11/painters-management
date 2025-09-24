import { Injectable } from '@nestjs/common';
import { WorkOrderMaterialGateway } from 'src/Persistence/Dal/WorkOrderMaterial/workOrderMaterial.gateway';
import { UpdateWorkOrderMaterialUseCaseCommand } from './UpdateWorkOrderMaterialUseCase.command';
import { WorkOrderMaterial } from '../../model/workOrderMaterial.model';

@Injectable()
export class UpdateWorkOrderMaterialUseCase {
  constructor(
    private readonly workOrderMaterialGateway: WorkOrderMaterialGateway
  ) {}

  async run(
    command: UpdateWorkOrderMaterialUseCaseCommand
  ): Promise<WorkOrderMaterial> {
    return await this.workOrderMaterialGateway.update(command);
  }
}
