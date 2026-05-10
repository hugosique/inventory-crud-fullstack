import { z } from 'zod';

export const productIdParam = z.object({
    id: z.string().uuid(),
});

export const productSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stockQuantity: z.number().int(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const createProductBody = z.object({
    name: z.string().min(3),
    description: z.string(),
    price: z.number().positive(),
    stockQuantity: z.number().int().nonnegative(),
});

export const updateProductBody = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    stockQuantity: z.number().int().nonnegative().optional(),
});

export type ProductIdParam = z.infer<typeof productIdParam>;
export type CreateProductBody = z.infer<typeof createProductBody>;
export type UpdateProductBody = z.infer<typeof updateProductBody>;
export type ProductSchema = z.infer<typeof productSchema>;