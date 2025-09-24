export interface FindAllSupplierUseCaseCommand {
  pagination: {
    pageNumber: number;
    pageSize: number;
  };
  filters?: {
    search?: string;
    name?: string;
    city?: string;
  };
}
