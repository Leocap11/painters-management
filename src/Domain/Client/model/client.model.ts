import { WorkOrder } from 'src/Domain/WorkOrder/model/workOrder.model';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;

  //optional fields
  fiscalCode?: string;
  vatNumber?: string;
  mobilePhone?: string;
  telephone?: string;
  email?: string;

  //relations
  WorkOrders: WorkOrder[];
}
