import z from 'zod';

export type CreateWorkOrderMaterialRequestDTO = z.infer<
  typeof CreateWorkOrderMaterialRequestSchema
>;

export const CreateWorkOrderMaterialRequestSchema = z.object({
  unitPrice: z.number().positive(),
  materialId: z.string(),
  squareMeters: z.number().positive()
});

export type UpdateWorkOrderMaterialRequestDTO = z.infer<
  typeof UpdateWorkOrderMaterialRequestSchema
>;

export const UpdateWorkOrderMaterialRequestSchema = z.object({
  unitPrice: z.number().positive().optional(),
  materialId: z.string().optional(),
  squareMeters: z.number().positive().optional()
});
