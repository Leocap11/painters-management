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

@Injectable()
export class SupplierGateway implements SupplierPersistenceGateway {
  constructor(private readonly prisma: PrismaPaintersEntities.PrismaClient) {}

  private readonly include = { Material: true };

  async getOne(input: { id: string }): Promise<Supplier> {
    const supplier = await this.prisma.supplier.findUnique({
      include: this.include,
      where: { id: input.id }
    });

    return FromSupplierEntityToSupplierModel(supplier);
  }
  async findAll(input: FindAllSupplierInput): Promise<Supplier[]> {
    const suppliers = await this.prisma.supplier.findMany({
      include: this.include,
      where: {
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
      }
    });

    return suppliers.map(FromSupplierEntityToSupplierModel);
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
