import { WorkOrderStatusModel } from '../../model/workOrder.model';

export interface FindAllWorkOrderUseCaseCommand {
  pagination: {
    pageNumber: number;
    pageSize: number;
  };
  filters?: {
    search?: string;
    isInvoiceSended?: boolean;
    city?: string;
    clientId?: string;
    materialId?: string[];
    periodDateFrom?: Date;
    periodDateTo?: Date;
    workOrderStatus?: WorkOrderStatusModel;
  };
}
