import { Injectable } from '@nestjs/common';
import { WorkOrderMaterialGateway } from 'src/Persistence/Dal/WorkOrderMaterial/workOrderMaterial.gateway';
import { DeleteWorkOrderMaterialUseCaseCommand } from './DeleteWorkOrderMaterialUseCase.command';

@Injectable()
export class DeleteWorkOrderMaterialUseCase {
  constructor(
    private readonly workOrderMaterialGateway: WorkOrderMaterialGateway
  ) {}

  async run(command: DeleteWorkOrderMaterialUseCaseCommand): Promise<void> {
    await this.workOrderMaterialGateway.delete(command);
  }
}
