import { Temporal } from '@js-temporal/polyfill';
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
    materialIds?: string[];
    periodDateFrom?: Temporal.PlainDate;
    periodDateTo?: Temporal.PlainDate;
    currentDate?: Temporal.PlainDate;
    workOrderStatus?: WorkOrderStatusModel;
  };
}
