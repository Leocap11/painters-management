import { Injectable } from '@nestjs/common';
import { MaterialGateway } from 'src/Persistence/Dal/Material/material.gateway';
import { GetMaterialUseCaseCommand } from './GetMaterialUseCase.command';
import { Material } from '../../model/material.model';

@Injectable()
export class GetMaterialUseCase {
  constructor(private readonly materialGateway: MaterialGateway) {}

  async run(command: GetMaterialUseCaseCommand): Promise<Material | null> {
    return await this.materialGateway.getOne(command);
  }
}
