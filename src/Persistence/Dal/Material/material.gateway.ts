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

@Injectable()
export class MaterialGateway implements MaterialPersistencePort {
  constructor(private readonly prisma: PrismaPaintersEntities.PrismaClient) {}

  private readonly include = { Supplier: true };
  async findAll(input: FindAllMaterialInput): Promise<Material[]> {
    const materials = await this.prisma.material.findMany({
      include: this.include,
      where: {
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
      }
    });

    return materials.map(FromMaterialEntityToMaterialModel);
  }

  async getOne(input: { id: string }): Promise<Material> {
    const material = await this.prisma.material.findUnique({
      include: this.include,
      where: { id: input.id }
    });

    return FromMaterialEntityToMaterialModel(material);
  }

  async create(input: CreateMaterialInput): Promise<Material> {
    const material = await this.prisma.material.create({
      include: this.include,
      data: {
        product_code: input.productCode,
        name: input.name,
        cost_per_square_meter: input.costPerSquareMeter,
        instructions_for_use: input.instructionForUse,
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
        instructions_for_use: input.data.instructionForUse,
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
