import fastify from 'fastify';
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod';
import { ZodError } from 'zod';
import { swaggerConfig } from './lib/swagger';
import { productRoutes } from './modules/products/product.routes';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

swaggerConfig(app);

app.addHook('onRoute', ({ method, url }) => {
  if (method) console.log(`[ROUTE]: ${method} ${url}`);
});

app.get("/", async (req, reply) => {
  return { hello: "world" };
});

app.register(productRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.issues })
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});