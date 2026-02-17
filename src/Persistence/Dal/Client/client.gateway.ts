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
import { Paged } from 'src/shared/utils/utils';
import { PaintersManagementService } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementClient';

@Injectable()
export class ClientGateway implements ClientPersistencePort {
  constructor(private readonly prisma: PaintersManagementService) { }

  private readonly include = {
    WorkOrder: true
  } satisfies PrismaPaintersEntities.Prisma.ClientInclude;

  async getCount(): Promise<number> {
    return await this.prisma.client.count()
  }

  async getOne(input: { id: string }): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      include: this.include,
      where: {
        id: input.id
      }
    });

    return client ? FromClientEntityToClientModel(client) : null;
  }

  async findAll(input: FindAllClientInput): Promise<Paged<Client[]>> {
    const where = {
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
    } satisfies PrismaPaintersEntities.Prisma.ClientWhereInput;

    const totalCount = await this.prisma.client.count({
      where
    });

    const clients = await this.prisma.client.findMany({
      include: this.include,
      skip: (input.pagination.pageNumber - 1) * input.pagination.pageSize,
      take: input.pagination.pageSize,
      where
    });

    return {
      data: clients.map(FromClientEntityToClientModel),
      pagination: {
        pageNumber: input.pagination.pageNumber,
        pageSize: input.pagination.pageSize,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / input.pagination.pageSize)
      }
    };
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
