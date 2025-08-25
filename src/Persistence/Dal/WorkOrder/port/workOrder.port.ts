import {
  WorkOrder,
  WorkOrderStatusModel
} from 'src/Domain/WorkOrder/model/workOrder.model';

export interface WorkOrderPersistencePort {
  findAll(input: FindAllWorkOrderInput): Promise<WorkOrder[]>;
  getOne(input: { id: string }): Promise<WorkOrder>;
  create(input: CreateWorkOrderInput): Promise<WorkOrder>;
  update(input: UpdateWorkOrderInput): Promise<WorkOrder>;
  updateStatus(input: UpdateStatusWorkOrderInput): Promise<WorkOrder>;
  delete(input: { id: string }): Promise<void>;
}

export interface FindAllWorkOrderInput {
  filters?: {
    search?: string;
    isInvoiceSended?: boolean;
    city?: string;
    clientId?: string;
    materialId?: string[];
    periodDateFrom?: Date;
    periodDateTo?: Date;
    workOrderStatus?: WorkOrderStatusModel;
  };
}

export interface CreateWorkOrderInput {
  client_id: string;
  startWorkOrderDate: Date;
  endWorkOrderDate: Date;
  netWorkCost: number;
  totalVatCost: number;
  workOrderMaterials: {
    material_id: string;
    squareMeters: number;
    unitPrice: number;
  }[];
}

export interface UpdateWorkOrderInput {
  id: string;
  data?: {
    startWorkOrderDate?: Date;
    endWorkOrderDate?: Date;
    isInvoiceSended?: boolean;
    netWorkCost?: number;
    totalVatCost?: number;
    finalCost?: number;
  };
}

export interface UpdateStatusWorkOrderInput {
  id: string;
  data?: {
    status?: WorkOrderStatusModel;
  };
}
