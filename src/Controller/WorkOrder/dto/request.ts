import { WorkOrderStatusModel } from 'src/Domain/WorkOrder/model/workOrder.model';
import z from 'zod';

export type CreateWorkOrderRequestDTO = z.infer<
  typeof CreateWorkOrderRequestSchema
>;

export const CreateWorkOrderRequestSchema = z.object({
  clientId: z.string(),
  startWorkOrderDate: z.string(),
  endWorkOrderDate: z.string(),
  workOrderMaterials: z.array(
    z.object({
      materialId: z.string(),
      squareMeters: z.number().positive(),
      unitPrice: z.number().positive()
    })
  )
});

export type UpdateWorkOrderRequestDTO = z.infer<
  typeof UpdateWorkOrderRequestSchema
>;

export const UpdateWorkOrderRequestSchema = z.object({
  startWorkOrderDate: z.string().optional(),
  endWorkOrderDate: z.string().optional(),
  isInvoiceSended: z.boolean().optional(),
  status: z.enum(WorkOrderStatusModel).optional()
});
