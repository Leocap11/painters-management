export interface FindAllMaterialUseCaseCommand {
  pagination: {
    pageNumber: number;
    pageSize: number;
  };
  filters?: {
    search?: string;
    name?: string;
    productCode?: string;
    supplierId?: string;
  };
}
