import { Material } from 'src/Domain/Material/model/material.model';
import { Paged } from 'src/shared/utils/utils';

export interface MaterialPersistencePort {
  findAll(input: FindAllMaterialInput): Promise<Paged<Material[]>>;
  getOne(input: { id: string }): Promise<Material | null>;
  create(input: CreateMaterialInput): Promise<Material>;
  update(input: UpdateMaterialInput): Promise<Material>;
  delete(input: { id: string }): Promise<void>;
}
export interface FindAllMaterialInput {
  pagination: {
    pageNumber: number;
    pageSize: number;
  };
  filters?: {
    search?: string;
    name?: string;
    productCode?: string;
    supplierId?: string;
  };
}
export interface CreateMaterialInput {
  productCode?: string;
  name: string;
  costPerSquareMeter: number;
  instructionForUse?: string;
  supplierId?: string;
  vatPercentage: number;
}

export interface UpdateMaterialInput {
  id: string;
  data?: {
    productCode?: string;
    name?: string;
    costPerSquareMeter?: number;
    instructionForUse?: string;
    supplierId?: string;
    vatPercentage?: number;
  };
}
