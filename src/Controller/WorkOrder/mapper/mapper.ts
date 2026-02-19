import { FromClientModelToClientResponseDTO } from './../../Client/mapper/mapper';
import { WorkOrder } from 'src/Domain/WorkOrder/model/workOrder.model';
import { WorkOrderResponseDTO } from '../dto/response';
import { FromWorkOrderMaterialModelToWorkOrderMaterialResponseDTO } from 'src/Controller/WorkOrderMaterial/mapper/mapper';

export const FromWorkOrderModelToWorkOrderResponseDTO = (
  source: WorkOrder
): WorkOrderResponseDTO => {
  return {
    id: source.id,
    endWorkOrderDate: source.endWorkOrderDate.toISOString(),
    startWorkOrderDate: source.startWorkOrderDate.toISOString(),
    finalWorkOrderCost: source.finalWorkOrderCost,
    isInvoiceSended: source.isInvoiceSended,
    netWorkOrderCost: source.netWorkOrderCost,
    totalWorkOrderVatCost: source.totalWorkOrderVatCost,
    status: source.status,

    //Relations
    Client: FromClientModelToClientResponseDTO(source.Client),
    WorkOrderMaterials: source.WorkOrderMaterials.map((wm) =>
      FromWorkOrderMaterialModelToWorkOrderMaterialResponseDTO(wm)
    )
  };
};
