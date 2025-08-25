import {
  WorkOrder,
  WorkOrderStatusModel
} from 'src/Domain/WorkOrder/model/workOrder.model';
import { WorkOrderEntity } from '../entity/workOrder.entity';
import { FromClientEntityWithoutWorkOrdersToClientModelWithoutWorkOrders } from '../../Client/mapper/client.mapper';
import { WorkOrderStatus } from '@prisma/client';
import { FromWorkOrderMaterialEntityToWorkOrderMaterialModel } from '../../WorkOrderMaterial/mapper/workOrderMaterial.mapper';

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
    status: FormWorkOrderStatusPrismaToWorkOrderStatus(source.status),

    //relations
    Client: FromClientEntityWithoutWorkOrdersToClientModelWithoutWorkOrders(
      source.Client
    ),
    WorkOrderMaterials: source.WorkOrderMaterials.map(
      FromWorkOrderMaterialEntityToWorkOrderMaterialModel
    )
  };
};

export const FormWorkOrderStatusPrismaToWorkOrderStatus = (
  source: WorkOrderStatus
): WorkOrderStatusModel => {
  switch (source) {
    case 'CLOSED':
      return WorkOrderStatusModel.CLOSED;
    case 'IN_PROGRESS':
      return WorkOrderStatusModel.IN_PROGRESS;
    case 'CREATED':
      return WorkOrderStatusModel.CREATED;
  }
};

export const FormWorkOrderStatusToWorkOrderStatusPrisma = (
  source: WorkOrderStatusModel
): WorkOrderStatus => {
  switch (source) {
    case WorkOrderStatusModel.CLOSED:
      return WorkOrderStatus.CLOSED;
    case WorkOrderStatusModel.IN_PROGRESS:
      return WorkOrderStatus.IN_PROGRESS;
    case WorkOrderStatusModel.CREATED:
      return WorkOrderStatus.CREATED;
  }
};
