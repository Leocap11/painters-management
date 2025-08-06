import { WorkOrder } from 'src/Domain/WorkOrder/model/workOrder.model';
import { WorkOrderEntity } from '../entity/workOrder.entity';
import { FromMaterialEntityToMaterialModel } from '../../Material/mapper/material.mapper';
import { FromClientEntityToClientModelWithoutWorkOrders } from '../../Client/mapper/client.mapper';

export const FromWorkOrderEntityToWorkOrderModel = (
  source: WorkOrderEntity
): WorkOrder => {
  return {
    id: source.id,
    netWorkOrderCost: source.net_work_cost,
    totalWorkOrderVatCost: source.total_vat_cost,
    finalWorkOrderCost: source.final_cost,
    startWorkOrderDate: source.start_work_date,
    endWorkOrderDate: source.end_work_date,
    isInvoiceSended: source.is_invoice_sended,

    //relations
    Client: FromClientEntityToClientModelWithoutWorkOrders(source.Client),
    Materials: source.Materials.map(FromMaterialEntityToMaterialModel)
  };
};
