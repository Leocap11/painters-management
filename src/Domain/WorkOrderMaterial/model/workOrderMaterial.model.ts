import { Material } from 'src/Domain/Material/model/material.model';

export interface WorkOrderMaterial {
  id: string;
  workOrderId: string;
  squareMeters: number;
  unitPrice: number;
  Material: Material;
}
