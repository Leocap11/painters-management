import z from 'zod';

export type CreateSupplierRequestDTO = z.infer<
  typeof CreateSupplierRequestSchema
>;

export const CreateSupplierRequestSchema = z.object({
  name: z.string(),
  vatNumber: z.string(),
  address: z.string(),
  city: z.string(),
  email: z.string().optional(),
  mobilePhone: z.string().optional(),
  telephone: z.string().optional()
});

export type UpdateSupplierRequestDTO = z.infer<
  typeof UpdateSupplierRequestSchema
>;

export const UpdateSupplierRequestSchema = z.object({
  name: z.string().optional(),
  vatNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  email: z.string().optional(),
  mobilePhone: z.string().optional(),
  telephone: z.string().optional()
});
