export interface CreateMaterialUseCaseCommand {
  productCode?: string;
  name: string;
  costPerSquareMeter: number;
  note?: string;
  supplierId: string;
  vatPercentage: number;
}
