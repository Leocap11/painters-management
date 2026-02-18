import { Temporal } from '@js-temporal/polyfill';
import { WorkOrderStatusModel } from '../../model/workOrder.model';

export interface UpdateWorkOrderUseCaseCommand {
  id: string;
  data: {
    startWorkOrderDate?: Temporal.PlainDate;
    endWorkOrderDate?: Temporal.PlainDate;
    isInvoiceSended?: boolean;
    netWorkCost?: number;
    totalVatCost?: number;
    status?: WorkOrderStatusModel;
  };
}
