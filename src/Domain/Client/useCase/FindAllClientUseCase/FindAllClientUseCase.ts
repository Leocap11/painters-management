import { Injectable } from '@nestjs/common';
import { ClientGateway } from 'src/Persistence/Dal/Client/client.gateway';
import { FindAllClientUseCaseCommand } from './FindAllClientUseCase.command';
import { Paged } from 'src/shared/utils/utils';
import { Client } from '../../model/client.model';

@Injectable()
export class FindAllClientUseCase {
  constructor(private readonly clientGateway: ClientGateway) {}

  async run(command: FindAllClientUseCaseCommand): Promise<Paged<Client[]>> {
    return await this.clientGateway.findAll(command);
  }
}
