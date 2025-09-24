import { Injectable } from '@nestjs/common';
import { MaterialGateway } from 'src/Persistence/Dal/Material/material.gateway';
import { DeleteMaterialUseCaseCommand } from './DeleteMaterialUseCase.command';

@Injectable()
export class DeleteMaterialUseCase {
  constructor(private readonly materialGateway: MaterialGateway) {}

  async run(command: DeleteMaterialUseCaseCommand): Promise<void> {
    await this.materialGateway.delete(command);
  }
}
