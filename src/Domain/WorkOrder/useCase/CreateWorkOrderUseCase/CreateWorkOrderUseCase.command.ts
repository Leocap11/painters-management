export interface CreateWorkOrderUseCaseCommand {
  clientId: string;
  startWorkOrderDate: Date;
  endWorkOrderDate: Date;
  workOrderMaterials: {
    materialId: string;
    squareMeters: number;
    unitPrice: number;
  }[];
}
