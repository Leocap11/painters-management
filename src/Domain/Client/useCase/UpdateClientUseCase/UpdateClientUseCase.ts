import { Injectable } from '@nestjs/common';
import { ClientGateway } from 'src/Persistence/Dal/Client/client.gateway';
import { UpdateClientUseCaseCommand } from './UpdateClientUseCase.command';
import { Client } from '../../model/client.model';

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly clientGateway: ClientGateway) {}

  async run(command: UpdateClientUseCaseCommand): Promise<Client> {
    return await this.clientGateway.update(command);
  }
}
