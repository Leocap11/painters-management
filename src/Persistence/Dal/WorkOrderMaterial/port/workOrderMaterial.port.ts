import { WorkOrderMaterial } from 'src/Domain/WorkOrderMaterial/model/workOrderMaterial.model';

export interface WorkOrderMaterialPersistencePort {
  create(input: CreateWorkOrderMaterialInput): Promise<WorkOrderMaterial>;
  update(input: UpdateWorkOrderMaterialInput): Promise<WorkOrderMaterial>;
  delete(input: { id: string }): Promise<void>;
}

export interface CreateWorkOrderMaterialInput {
  unitPrice: number;
  workOrderId: string;
  materialId: string;
  squareMeters: number;
}

export interface UpdateWorkOrderMaterialInput {
  id: string;
  data?: {
    unitPrice?: number;
    materialId?: string;
    squareMeters?: number;
  };
}
