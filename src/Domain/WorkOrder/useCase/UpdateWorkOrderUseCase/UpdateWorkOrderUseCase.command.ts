import { WorkOrderStatusModel } from '../../model/workOrder.model';

export interface UpdateWorkOrderUseCaseCommand {
  id: string;
  data: {
    startWorkOrderDate?: Date;
    endWorkOrderDate?: Date;
    isInvoiceSended?: boolean;
    netWorkCost?: number;
    totalVatCost?: number;
    status?: WorkOrderStatusModel;
  };
}
