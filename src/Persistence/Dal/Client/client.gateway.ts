import { Injectable } from '@nestjs/common';
import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';
import {
  ClientPersistencePort,
  CreateClientInput,
  FindAllClientInput,
  UpdateClientInput
} from './port/client.port';
import { Client } from 'src/Domain/Client/model/client.model';
import { FromClientEntityToClientModel } from './mapper/client.mapper';

@Injectable()
export class ClientGateway implements ClientPersistencePort {
  constructor(private readonly prisma: PrismaPaintersEntities.PrismaClient) {}

  private readonly include = { WorkOrder: true };

  async getOne(input: { id: string }): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      include: this.include,
      where: {
        id: input.id
      }
    });

    return FromClientEntityToClientModel(client);
  }

  async findAll(input: FindAllClientInput): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      include: this.include,
      where: {
        AND: [
          {
            ...(input.filters.city && {
              city: input.filters.city
            })
          }
        ],
        ...(input.filters.search && {
          OR: [
            {
              first_name: {
                contains: input.filters.search,
                mode: 'insensitive'
              }
            },
            {
              last_name: {
                contains: input.filters.search,
                mode: 'insensitive'
              }
            },
            {
              telephone: {
                contains: input.filters.search,
                mode: 'insensitive'
              }
            },
            {
              mobile_phone: {
                contains: input.filters.search,
                mode: 'insensitive'
              }
            },
            {
              vat_number: {
                contains: input.filters.search,
                mode: 'insensitive'
              }
            },
            {
              fiscal_code: {
                contains: input.filters.search,
                mode: 'insensitive'
              }
            }
          ]
        })
      }
    });

    return clients.map(FromClientEntityToClientModel);
  }

  async create(input: CreateClientInput): Promise<Client> {
    const client = await this.prisma.client.create({
      include: this.include,
      data: {
        first_name: input.firstName,
        last_name: input.lastName,
        address: input.address,
        city: input.city,
        fiscal_code: input.fiscalCode,
        vat_number: input.vatNumber,
        mobile_phone: input.mobilePhone,
        telephone: input.telephone,
        email: input.email
      }
    });

    return FromClientEntityToClientModel(client);
  }
  async update(input: UpdateClientInput): Promise<Client> {
    const client = await this.prisma.client.update({
      include: this.include,
      where: { id: input.id },
      data: {
        first_name: input.data.firstName,
        last_name: input.data.lastName,
        address: input.data.address,
        city: input.data.city,
        fiscal_code: input.data.fiscalCode,
        vat_number: input.data.vatNumber,
        mobile_phone: input.data.mobilePhone,
        telephone: input.data.telephone,
        email: input.data.email
      }
    });

    return FromClientEntityToClientModel(client);
  }

  async delete(input: { id: string }): Promise<void> {
    await this.prisma.client.delete({
      where: { id: input.id }
    });
  }
}
