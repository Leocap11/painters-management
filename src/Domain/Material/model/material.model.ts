export interface Material {
  id: string;
  productCode?: string;
  name: string;
  costPerSquareMeter: number;
  note?: string;
  vatPercentage: number;
  supplierId: string;
}
