import { Material } from 'src/Domain/Material/model/material.model';

export interface MaterialPersistencePort {
  findAll(input: FindAllMaterialInput): Promise<Material[]>;
  getOne(input: { id: string }): Promise<Material>;
  create(input: CreateMaterialInput): Promise<Material>;
  update(input: UpdateMaterialInput): Promise<Material>;
  delete(input: { id: string }): Promise<void>;
}
export interface FindAllMaterialInput {
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
