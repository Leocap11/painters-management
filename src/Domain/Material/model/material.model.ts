export interface Material {
  id: string;
  productCode?: string;
  name: string;
  costPerSquareMeter: number;
  instructionsForUse?: string;
  vatPercentage: number;
  supplierId: string;
}
