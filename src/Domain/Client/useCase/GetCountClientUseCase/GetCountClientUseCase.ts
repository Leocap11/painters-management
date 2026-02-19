import { Injectable } from '@nestjs/common';
import { ClientGateway } from 'src/Persistence/Dal/Client/client.gateway';

@Injectable()
export class GetCountClientUseCase {
  constructor(private readonly clientGateway: ClientGateway) {}

  async run(): Promise<number> {
    return await this.clientGateway.getCount();
  }
}
