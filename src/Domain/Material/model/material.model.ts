import { Supplier } from 'src/Domain/Supplier/model/supplier.model';

export interface Material {
  id: string;
  productCode?: string;
  name: string;
  costPerSquareMeter: number;
  note?: string;
  vatPercentage: number;
  Supplier: Supplier;
}
