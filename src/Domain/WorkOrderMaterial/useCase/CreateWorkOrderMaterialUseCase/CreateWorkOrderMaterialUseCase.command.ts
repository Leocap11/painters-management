export interface CreateWorkOrderMaterialUseCaseCommand {
  unitPrice: number;
  workOrderId: string;
  materialId: string;
  squareMeters: number;
}
