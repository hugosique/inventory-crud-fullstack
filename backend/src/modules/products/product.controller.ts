import { FastifyReply, FastifyRequest } from 'fastify';
import { ProductService } from './product.service';
import { createProductBody, updateProductBody } from './product.schema';

export class ProductController {
    constructor(private productService: ProductService) { }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const { query } = request.query as { query?: string };
        const products = await this.productService.listProducts(query);
        return reply.send(products);
    }

    async find(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const product = await this.productService.findById(id);
        return reply.send(product);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = createProductBody.parse(request.body);
        const product = await this.productService.createProduct(data);
        return reply.status(201).send(product);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const body = updateProductBody.parse(request.body);
        const product = await this.productService.updateProduct(id, body);
        return reply.status(200).send(product);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        await this.productService.deleteProduct(id);
        return reply.status(204).send();
    }
}
