import { Client } from 'src/Domain/Client/model/client.model';
import { WorkOrderMaterial } from 'src/Domain/WorkOrderMaterial/model/workOrderMaterial.model';

export interface WorkOrder {
  id: string;
  netWorkOrderCost: number;
  totalWorkOrderVatCost: number;
  finalWorkOrderCost: number;
  startWorkOrderDate: Date;
  endWorkOrderDate: Date;
  isInvoiceSended: boolean;
  status: WorkOrderStatusModel;

  //relations
  Client: Client;
  WorkOrderMaterials: WorkOrderMaterial[];
}

export enum WorkOrderStatusModel {
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
  CREATED = 'CREATED'
}
