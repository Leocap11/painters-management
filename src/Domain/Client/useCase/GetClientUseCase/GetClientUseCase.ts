import { Injectable } from '@nestjs/common';
import { ClientGateway } from 'src/Persistence/Dal/Client/client.gateway';
import { Client } from '../../model/client.model';
import { GetClientUseCaseCommand } from './GetClientUseCase.command';

@Injectable()
export class GetClientUseCase {
  constructor(private readonly clientGateway: ClientGateway) {}

  async run(command: GetClientUseCaseCommand): Promise<Client | null> {
    return await this.clientGateway.getOne(command);
  }
}
