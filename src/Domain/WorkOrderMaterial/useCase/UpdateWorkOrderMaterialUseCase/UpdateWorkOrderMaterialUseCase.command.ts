export interface UpdateWorkOrderMaterialUseCaseCommand {
  id: string;
  data: {
    unitPrice?: number;
    materialId?: string;
    squareMeters?: number;
  };
}
