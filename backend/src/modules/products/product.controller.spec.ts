import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ProductController } from './product.controller';

function createReplyMock() {
  const reply: any = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };
  return reply;
}

describe('ProductController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('(u) getProducts: should list products', async () => {
    const service = { listProducts: vi.fn().mockResolvedValue([{ id: 'p1' }]) } as any;
    const controller = new ProductController(service);
    const reply = createReplyMock();

    await controller.list({ query: {} } as any, reply);

    expect(service.listProducts).toHaveBeenCalledTimes(1);
    expect(service.listProducts).toHaveBeenCalledWith(undefined);
    expect(reply.send).toHaveBeenCalledWith([{ id: 'p1' }]);
  });

  it('(u) getProducts: should pass query string to service when provided', async () => {
    const service = { listProducts: vi.fn().mockResolvedValue([{ id: 'p1' }]) } as any;
    const controller = new ProductController(service);
    const reply = createReplyMock();

    await controller.list({ query: { query: 'mouse' } } as any, reply);

    expect(service.listProducts).toHaveBeenCalledWith('mouse');
  });

  it('(u) findProduct: should find product by id', async () => {
    const service = { findById: vi.fn().mockResolvedValue({ id: 'p1' }) } as any;
    const controller = new ProductController(service);
    const reply = createReplyMock();

    await controller.find({ params: { id: 'p1' } } as any, reply);

    expect(service.findById).toHaveBeenCalledWith('p1');
    expect(reply.send).toHaveBeenCalledWith({ id: 'p1' });
  });

  it('(u) createProduct: should validate body and create product', async () => {
    const service = { createProduct: vi.fn().mockResolvedValue({ id: 'p1' }) } as any;
    const controller = new ProductController(service);
    const reply = createReplyMock();

    const body = { name: 'Mouse', description: 'Mouse', price: 10, stockQuantity: 2 };
    await controller.create({ body } as any, reply);

    expect(service.createProduct).toHaveBeenCalledWith(body);
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({ id: 'p1' });
  });

  it('(u) updateProduct: should validate body and update product', async () => {
    const service = { updateProduct: vi.fn().mockResolvedValue({ id: 'p1' }) } as any;
    const controller = new ProductController(service);
    const reply = createReplyMock();

    const body = { name: 'Novo nome' };
    await controller.update({ params: { id: 'p1' }, body } as any, reply);

    expect(service.updateProduct).toHaveBeenCalledWith('p1', body);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({ id: 'p1' });
  });

  it('(u) deleteProduct: should delete product and return 204', async () => {
    const service = { deleteProduct: vi.fn().mockResolvedValue(undefined) } as any;
    const controller = new ProductController(service);
    const reply = createReplyMock();

    await controller.delete({ params: { id: 'p1' } } as any, reply);

    expect(service.deleteProduct).toHaveBeenCalledWith('p1');
    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.send).toHaveBeenCalledWith();
  });
});

