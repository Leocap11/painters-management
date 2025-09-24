import { Injectable } from '@nestjs/common';
import { ClientGateway } from 'src/Persistence/Dal/Client/client.gateway';
import { CreateClientUseCaseCommand } from './CreateClientUseCase.command';
import { Client } from '../../model/client.model';

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientGateway: ClientGateway) {}

  async run(command: CreateClientUseCaseCommand): Promise<Client> {
    return await this.clientGateway.create(command);
  }
}
