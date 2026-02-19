import { Temporal } from '@js-temporal/polyfill';
import {
  WorkOrder,
  WorkOrderStatusModel
} from 'src/Domain/WorkOrder/model/workOrder.model';
import { Paged } from 'src/shared/utils/utils';

export interface WorkOrderPersistencePort {
  findAll(input: FindAllWorkOrderInput): Promise<Paged<WorkOrder[]>>;
  getOne(input: { id: string }): Promise<WorkOrder | null>;
  create(input: CreateWorkOrderInput): Promise<WorkOrder>;
  update(input: UpdateWorkOrderInput): Promise<WorkOrder>;
  delete(input: { id: string }): Promise<void>;
}

export interface FindAllWorkOrderInput {
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

export interface CreateWorkOrderInput {
  clientId: string;
  startWorkOrderDate: Temporal.PlainDate;
  endWorkOrderDate: Temporal.PlainDate;
  netWorkCost: number;
  totalVatCost: number;
  workOrderMaterials: {
    materialId: string;
    squareMeters: number;
    unitPrice: number;
  }[];
}

export interface UpdateWorkOrderInput {
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
