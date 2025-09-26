import { Injectable } from '@nestjs/common';
import { PrismaPaintersEntities } from 'src/Persistence/Clients/Prisma/PrismaPaintersManagementTypes';
import {
  CreateMaterialInput,
  FindAllMaterialInput,
  MaterialPersistencePort,
  UpdateMaterialInput
} from './port/material.port';
import { Material } from 'src/Domain/Material/model/material.model';
import { FromMaterialEntityToMaterialModel } from './mapper/material.mapper';
import { Paged } from 'src/shared/utils/utils';

@Injectable()
export class MaterialGateway implements MaterialPersistencePort {
  constructor(private readonly prisma: PrismaPaintersEntities.PrismaClient) {}

  private readonly include = { Supplier: true };
  async findAll(input: FindAllMaterialInput): Promise<Paged<Material[]>> {
    const where = {
      ...(input.filters.search && {
        OR: [
          {
            name: {
              contains: input.filters.name,
              mode: 'insensitive'
            }
          },
          {
            product_code: {
              contains: input.filters.productCode,
              mode: 'insensitive'
            }
          }
        ]
      }),
      AND: [
        {
          ...(input.filters.name && {
            name: input.filters.name
          })
        },
        {
          ...(input.filters.productCode && {
            name: input.filters.productCode
          })
        },
        {
          ...(input.filters.supplierId && {
            name: input.filters.supplierId
          })
        }
      ]
    } satisfies PrismaPaintersEntities.Prisma.MaterialWhereInput;

    const totalCount = await this.prisma.material.count({
      where
    });

    const materials = await this.prisma.material.findMany({
      include: this.include,
      skip: (input.pagination.pageNumber - 1) * input.pagination.pageSize,
      take: input.pagination.pageSize,
      where
    });

    return {
      data: materials.map(FromMaterialEntityToMaterialModel),
      pagination: {
        pageNumber: input.pagination.pageNumber,
        pageSize: input.pagination.pageSize,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / input.pagination.pageSize)
      }
    };
  }

  async getOne(input: { id: string }): Promise<Material | null> {
    const material = await this.prisma.material.findUnique({
      include: this.include,
      where: { id: input.id }
    });

    return material ? FromMaterialEntityToMaterialModel(material) : null;
  }

  async create(input: CreateMaterialInput): Promise<Material> {
    const material = await this.prisma.material.create({
      include: this.include,
      data: {
        product_code: input.productCode,
        name: input.name,
        cost_per_square_meter: input.costPerSquareMeter,
        note: input.note,
        Supplier: {
          connect: {
            id: input.supplierId
          }
        },
        vat_percentage: input.vatPercentage
      }
    });

    return FromMaterialEntityToMaterialModel(material);
  }
  async update(input: UpdateMaterialInput): Promise<Material> {
    const material = await this.prisma.material.update({
      include: this.include,
      where: { id: input.id },
      data: {
        product_code: input.data.productCode,
        name: input.data.name,
        cost_per_square_meter: input.data.costPerSquareMeter,
        note: input.data.note,
        vat_percentage: input.data.vatPercentage
      }
    });

    return FromMaterialEntityToMaterialModel(material);
  }

  async delete(input: { id: string }): Promise<void> {
    await this.prisma.material.delete({
      where: { id: input.id }
    });
  }
}
