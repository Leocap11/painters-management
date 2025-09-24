import { Injectable } from '@nestjs/common';
import { ClientGateway } from 'src/Persistence/Dal/Client/client.gateway';
import { DeleteClientUseCaseCommand } from './DeleteClientUseCase.command';

@Injectable()
export class DeleteClientUseCase {
  constructor(private readonly clientGateway: ClientGateway) {}

  async run(command: DeleteClientUseCaseCommand): Promise<void> {
    await this.clientGateway.delete(command);
  }
}
