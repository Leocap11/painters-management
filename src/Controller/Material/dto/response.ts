export interface MaterialResponseDTO {
  id: string;
  productCode: string | null;
  name: string;
  costPerSquareMeter: number;
  instructionsForUse: string | null;
  vatPercentage: number;

  supplierId: string | null;
}
