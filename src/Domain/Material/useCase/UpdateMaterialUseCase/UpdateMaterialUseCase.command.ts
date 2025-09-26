export interface UpdateMaterialUseCaseCommand {
  id: string;
  data: {
    productCode?: string;
    name?: string;
    costPerSquareMeter?: number;
    instructionForUse?: string;
    vatPercentage?: number;
  };
}
