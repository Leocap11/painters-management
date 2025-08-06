import { Client } from 'src/Domain/Client/model/client.model';
import { Material } from 'src/Domain/Material/model/material.model';

export interface WorkOrder {
  id: string;
  netWorkOrderCost: number;
  totalWorkOrderVatCost: number;
  finalWorkOrderCost: number;
  startWorkOrderDate: Date;
  endWorkOrderDate: Date;
  isInvoiceSended: boolean;

  //relations
  Client: Omit<Client, 'WorkOrders'>;
  Materials: Material[];
}
