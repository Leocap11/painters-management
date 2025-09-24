export interface CreateWorkOrderUseCaseCommand {
  client_id: string;
  startWorkOrderDate: Date;
  endWorkOrderDate: Date;
  netWorkCost: number;
  totalVatCost: number;
  workOrderMaterials: {
    material_id: string;
    squareMeters: number;
    unitPrice: number;
  }[];
}
