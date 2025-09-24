import { Injectable } from '@nestjs/common';
import { MaterialGateway } from 'src/Persistence/Dal/Material/material.gateway';
import { FindAllMaterialUseCaseCommand } from './FindAllMaterialUseCase.command';
import { Paged } from 'src/shared/utils/utils';
import { Material } from '../../model/material.model';

@Injectable()
export class FindAllMaterialUseCase {
  constructor(private readonly materialGateway: MaterialGateway) {}

  async run(
    command: FindAllMaterialUseCaseCommand
  ): Promise<Paged<Material[]>> {
    return await this.materialGateway.findAll(command);
  }
}
