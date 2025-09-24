import { Injectable } from '@nestjs/common';
import { MaterialGateway } from 'src/Persistence/Dal/Material/material.gateway';
import { CreateMaterialUseCaseCommand } from './CreateMaterialUseCase.command';
import { Material } from '../../model/material.model';

@Injectable()
export class CreateMaterialUseCase {
  constructor(private readonly materialGateway: MaterialGateway) {}

  async run(command: CreateMaterialUseCaseCommand): Promise<Material> {
    return await this.materialGateway.create(command);
  }
}
