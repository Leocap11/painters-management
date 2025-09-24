export interface CreateMaterialUseCaseCommand {
  productCode?: string;
  name: string;
  costPerSquareMeter: number;
  instructionForUse?: string;
  supplierId?: string;
  vatPercentage: number;
}
