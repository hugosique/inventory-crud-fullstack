import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { jsonSchemaTransform } from '@fastify/type-provider-zod';
import { FastifyInstance } from 'fastify';

export async function swaggerConfig(app: FastifyInstance) {
    await app.register(swagger, {
        openapi: {
            info: {
                title: 'Inventory CRUD API',
                version: '1.0.0',
            },
            servers: [
                {
                    url: 'http://localhost:3333',
                },
            ],
        },
        transform: jsonSchemaTransform,
    });
    await app.register(swaggerUI, { routePrefix: '/docs' });
}