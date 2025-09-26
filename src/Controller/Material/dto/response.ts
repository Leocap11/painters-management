export interface MaterialResponseDTO {
  id: string;
  productCode: string | null;
  name: string;
  costPerSquareMeter: number;
  note: string | null;
  vatPercentage: number;

  supplierId: string;
}
