// src/routes/product-routes.ts
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import { z } from 'zod';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { createProductBody, productIdParam, productSchema, updateProductBody } from './product.schema';

export async function productRoutes(app: FastifyInstance) {
  const service = new ProductService();
  const controller = new ProductController(service);

  app.withTypeProvider<ZodTypeProvider>().get(
    '/products',
    {
      schema: {
        tags: ['products'],
        response: {
          200: productSchema.array(),
        },
      },
    },
    controller.list.bind(controller)
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    '/products/:id',
    {
      schema: {
        tags: ['products'],
        params: productIdParam,
        response: {
          200: productSchema,
        },
      },
    },
    controller.find.bind(controller)
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    '/products',
    {
      schema: {
        tags: ['products'],
        body: createProductBody,
        response: {
          201: productSchema,
        },
      },
    },
    controller.create.bind(controller)
  );

  app.withTypeProvider<ZodTypeProvider>().patch(
    '/products/:id',
    {
      schema: {
        tags: ['products'],
        params: productIdParam,
        body: updateProductBody,
        response: {
          200: productSchema,
        },
      },
    },
    controller.update.bind(controller)
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/products/:id',
    {
      schema: {
        tags: ['products'],
        params: productIdParam,
        response: {
          204: z.null().optional(),
        },
      },
    },
    controller.delete.bind(controller)
  );
}
