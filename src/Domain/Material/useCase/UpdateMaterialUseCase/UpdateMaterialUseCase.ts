import { Injectable } from '@nestjs/common';
import { MaterialGateway } from 'src/Persistence/Dal/Material/material.gateway';
import { UpdateMaterialUseCaseCommand } from './UpdateMaterialUseCase.command';
import { Material } from '../../model/material.model';

@Injectable()
export class UpdateMaterialUseCase {
  constructor(private readonly materialGateway: MaterialGateway) {}

  async run(command: UpdateMaterialUseCaseCommand): Promise<Material> {
    return await this.materialGateway.update(command);
  }
}
