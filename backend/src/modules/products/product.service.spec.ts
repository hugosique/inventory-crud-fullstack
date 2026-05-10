import { describe, expect, it, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  product: {
    findMany: vi.fn(),
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../../lib/prisma', () => ({
  prisma: prismaMock,
}));

import { ProductService } from './product.service';

describe('ProductService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('(u) getProducts: should list products', async () => {
    prismaMock.product.findMany.mockResolvedValueOnce([{ id: 'p1' }]);

    const service = new ProductService();
    const result = await service.listProducts();

    expect(prismaMock.product.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 'p1' }]);
  });

  it('(u) createProduct: should create a product', async () => {
    const data = {
      name: 'Mouse',
      description: 'Mouse sem fio',
      price: 10,
      stockQuantity: 2,
    };

    prismaMock.product.create.mockResolvedValueOnce({ id: 'p1', ...data });

    const service = new ProductService();
    const result = await service.createProduct(data);

    expect(prismaMock.product.create).toHaveBeenCalledWith({ data });
    expect(result).toEqual({ id: 'p1', ...data });
  });

  it('(u) findProduct[NotFound]: should throw when product is not found', async () => {
    prismaMock.product.findUnique.mockResolvedValueOnce(null);

    const service = new ProductService();
    await expect(service.findById('missing')).rejects.toThrow('Produto não encontrado');
  });

  it('(u) findProduct: should return product when found', async () => {
    prismaMock.product.findUnique.mockResolvedValueOnce({ id: 'p1' });

    const service = new ProductService();
    const result = await service.findById('p1');

    expect(prismaMock.product.findUnique).toHaveBeenCalledWith({ where: { id: 'p1' } });
    expect(result).toEqual({ id: 'p1' });
  });

  it('(u) updateProduct[NotFound]: should throw when product is not found', async () => {
    prismaMock.product.findUnique.mockResolvedValueOnce(null);

    const service = new ProductService();
    await expect(service.updateProduct('missing', { name: 'Novo' })).rejects.toThrow('Produto não encontrado');
  });

  it('(u) updateProduct: should update product when found', async () => {
    prismaMock.product.findUnique.mockResolvedValueOnce({ id: 'p1' });
    prismaMock.product.update.mockResolvedValueOnce({ id: 'p1', name: 'Novo' });

    const service = new ProductService();
    const result = await service.updateProduct('p1', { name: 'Novo' });

    expect(prismaMock.product.update).toHaveBeenCalledWith({ where: { id: 'p1' }, data: { name: 'Novo' } });
    expect(result).toEqual({ id: 'p1', name: 'Novo' });
  });

  it('(u) deleteProduct[NotFound]: should throw when product is not found', async () => {
    prismaMock.product.findUnique.mockResolvedValueOnce(null);

    const service = new ProductService();
    await expect(service.deleteProduct('missing')).rejects.toThrow('Produto não encontrado');
  });

  it('(u) deleteProduct: should delete product when found', async () => {
    prismaMock.product.findUnique.mockResolvedValueOnce({ id: 'p1' });
    prismaMock.product.delete.mockResolvedValueOnce({ id: 'p1' });

    const service = new ProductService();
    const result = await service.deleteProduct('p1');

    expect(prismaMock.product.delete).toHaveBeenCalledWith({ where: { id: 'p1' } });
    expect(result).toEqual({ id: 'p1' });
  });
});

