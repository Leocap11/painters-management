import { WorkOrderMaterialResponseDTO } from 'src/Controller/WorkOrderMaterial/dto/response';
import { WorkOrderStatusModel } from 'src/Domain/WorkOrder/model/workOrder.model';

export interface WorkOrderResponseDTO {
  id: string;
  netWorkOrderCost: number;
  totalWorkOrderVatCost: number;
  finalWorkOrderCost: number;
  startWorkOrderDate: string;
  endWorkOrderDate: string;
  isInvoiceSended: boolean;
  status: WorkOrderStatusModel;
  clientId: string;

  //relations
  WorkOrderMaterials: WorkOrderMaterialResponseDTO[];
}
