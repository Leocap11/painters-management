import { Injectable } from '@nestjs/common';
import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';
import {
  CreateSupplierInput,
  FindAllSupplierInput,
  SupplierPersistenceGateway,
  UpdateSupplierInput
} from './port/supplier.port';
import { Supplier } from 'src/Domain/Supplier/model/supplier.model';
import { FromSupplierEntityToSupplierModel } from './mapper/supplier.mapper';
import { Paged } from 'src/shared/utils/utils';
import { PaintersManagementService } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementClient';

@Injectable()
export class SupplierGateway implements SupplierPersistenceGateway {
  constructor(private readonly prisma: PaintersManagementService) {}

  private readonly include = { Material: true };

  async getCount(): Promise<number> {
    return await this.prisma.supplier.count();
  }

  async getOne(input: { id: string }): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findUnique({
      include: this.include,
      where: { id: input.id }
    });

    return supplier ? FromSupplierEntityToSupplierModel(supplier) : null;
  }
  async findAll(input: FindAllSupplierInput): Promise<Paged<Supplier[]>> {
    const where = {
      ...(input.filters.search && {
        OR: [
          {
            name: {
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
            address: {
              contains: input.filters.search,
              mode: 'insensitive'
            }
          }
        ]
      }),
      AND: [
        {
          ...(input.filters.city && {
            city: input.filters.city
          })
        },
        {
          ...(input.filters.name && {
            name: input.filters.name
          })
        }
      ]
    } satisfies PrismaPaintersEntities.Prisma.SupplierWhereInput;

    const totalCount = await this.prisma.supplier.count({
      where
    });

    const suppliers = await this.prisma.supplier.findMany({
      include: this.include,
      skip: (input.pagination.pageNumber - 1) * input.pagination.pageSize,
      take: input.pagination.pageSize,
      where
    });

    return {
      data: suppliers.map(FromSupplierEntityToSupplierModel),
      pagination: {
        pageNumber: input.pagination.pageNumber,
        pageSize: input.pagination.pageSize,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / input.pagination.pageSize)
      }
    };
  }

  async create(input: CreateSupplierInput): Promise<Supplier> {
    const supplier = await this.prisma.supplier.create({
      include: this.include,
      data: {
        name: input.name,
        vat_number: input.vatNumber,
        address: input.address,
        city: input.city,
        email: input.email,
        mobile_phone: input.mobilePhone,
        telephone: input.telephone
      }
    });

    return FromSupplierEntityToSupplierModel(supplier);
  }
  async update(input: UpdateSupplierInput): Promise<Supplier> {
    const supplier = await this.prisma.supplier.update({
      include: this.include,
      where: { id: input.id },
      data: {
        name: input.data.name,
        vat_number: input.data.vatNumber,
        address: input.data.address,
        city: input.data.city,
        email: input.data.email,
        mobile_phone: input.data.mobilePhone,
        telephone: input.data.telephone
      }
    });

    return FromSupplierEntityToSupplierModel(supplier);
  }
  async delete(input: { id: string }): Promise<void> {
    await this.prisma.supplier.delete({
      where: { id: input.id }
    });
  }
}
