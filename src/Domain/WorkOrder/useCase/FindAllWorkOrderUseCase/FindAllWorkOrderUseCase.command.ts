export interface FindAllWorkOrderUseCaseCommand {
  pagination: {
    pageNumber: number;
    pageSize: number;
  };
  filters?: {
    search?: string;
  };
}
