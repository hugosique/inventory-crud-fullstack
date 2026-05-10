import { describe, expect, it } from 'vitest';
import {
  productIdParam,
  productSchema,
  createProductBody,
  updateProductBody,
} from './product.schema';

const validUuid = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

function ok<T>(schema: { parse: (v: unknown) => T }, value: unknown): T {
  return schema.parse(value);
}

function fail(schema: { safeParse: (v: unknown) => { success: boolean } }, value: unknown) {
  const result = schema.safeParse(value);
  expect(result.success).toBe(false);
  return result;
}

describe('productIdParam', () => {
  it('(u) [valid] should accept a valid UUID', () => {
    const parsed = ok(productIdParam, { id: validUuid });
    expect(parsed.id).toBe(validUuid);
  });

  it('(u) [invalid] should reject a non-UUID string', () => {
    fail(productIdParam, { id: 'not-a-uuid' });
  });

  it('(u) [invalid] should reject an empty string as id', () => {
    fail(productIdParam, { id: '' });
  });

  it('(u) [invalid] should reject a numeric id', () => {
    fail(productIdParam, { id: 123 });
  });

  it('(u) [invalid] should reject missing id field', () => {
    fail(productIdParam, {});
  });
});

describe('productSchema', () => {
  const validProduct = {
    id: validUuid,
    name: 'Monitor LED',
    description: 'Monitor de 24 polegadas',
    price: 899.9,
    stockQuantity: 10,
    createdAt: '2026-05-04T10:00:00.000Z',
    updatedAt: '2026-05-04T10:00:00.000Z',
  };

  it('(u) [valid] should parse a complete product object', () => {
    const parsed = ok(productSchema, validProduct);
    expect(parsed.id).toBe(validUuid);
    expect(parsed.name).toBe('Monitor LED');
    expect(parsed.price).toBe(899.9);
    expect(parsed.stockQuantity).toBe(10);
    expect(parsed.createdAt).toBeInstanceOf(Date);
    expect(parsed.updatedAt).toBeInstanceOf(Date);
  });

  it('(u) [valid] should coerce ISO date strings to Date instances', () => {
    const parsed = ok(productSchema, validProduct);
    expect(parsed.createdAt.toISOString()).toBe('2026-05-04T10:00:00.000Z');
  });

  it('(u) [valid] should accept Date objects directly for createdAt/updatedAt', () => {
    const now = new Date();
    const parsed = ok(productSchema, { ...validProduct, createdAt: now, updatedAt: now });
    expect(parsed.createdAt).toEqual(now);
  });

  it('(u) [invalid] should reject a non-UUID id', () => {
    fail(productSchema, { ...validProduct, id: 'bad-id' });
  });

  it('(u) [invalid] should reject when name is missing', () => {
    const { name: _, ...rest } = validProduct;
    fail(productSchema, rest);
  });

  it('(u) [invalid] should reject when price is a string', () => {
    fail(productSchema, { ...validProduct, price: 'free' });
  });

  it('(u) [invalid] should reject a float stockQuantity', () => {
    fail(productSchema, { ...validProduct, stockQuantity: 1.5 });
  });

  it('(u) [invalid] should reject an invalid date string for createdAt', () => {
    fail(productSchema, { ...validProduct, createdAt: 'not-a-date' });
  });
});

describe('createProductBody', () => {
  const validBody = {
    name: 'Teclado Mecânico',
    description: 'Switch brown',
    price: 299.9,
    stockQuantity: 5,
  };

  it('(u) [valid] should accept a complete valid body', () => {
    const parsed = ok(createProductBody, validBody);
    expect(parsed.name).toBe('Teclado Mecânico');
    expect(parsed.price).toBe(299.9);
    expect(parsed.stockQuantity).toBe(5);
  });

  it('(u) [invalid] name too short — should reject names with fewer than 3 characters', () => {
    fail(createProductBody, { ...validBody, name: 'Ab' });
  });

  it('(u) [invalid] name empty — should reject empty string', () => {
    fail(createProductBody, { ...validBody, name: '' });
  });

  it('(u) [invalid] price zero — should reject non-positive price', () => {
    fail(createProductBody, { ...validBody, price: 0 });
  });

  it('(u) [invalid] price negative — should reject negative price', () => {
    fail(createProductBody, { ...validBody, price: -10 });
  });

  it('(u) [invalid] price string — should reject non-numeric price', () => {
    fail(createProductBody, { ...validBody, price: 'caro' });
  });

  it('(u) [invalid] stockQuantity negative — should reject negative stock', () => {
    fail(createProductBody, { ...validBody, stockQuantity: -1 });
  });

  it('(u) [invalid] stockQuantity float — should reject fractional stock', () => {
    fail(createProductBody, { ...validBody, stockQuantity: 2.5 });
  });

  it('(u) [valid] stockQuantity zero — should accept zero stock', () => {
    const parsed = ok(createProductBody, { ...validBody, stockQuantity: 0 });
    expect(parsed.stockQuantity).toBe(0);
  });

  it('(u) [invalid] missing required fields — should reject empty object', () => {
    fail(createProductBody, {});
  });

  it('(u) [invalid] missing description — should reject without description', () => {
    const { description: _, ...rest } = validBody;
    fail(createProductBody, rest);
  });
});

describe('updateProductBody', () => {
  it('(u) [valid] should accept an empty object (all fields optional)', () => {
    const parsed = ok(updateProductBody, {});
    expect(parsed).toEqual({});
  });

  it('(u) [valid] should accept only name', () => {
    const parsed = ok(updateProductBody, { name: 'Novo Nome' });
    expect(parsed.name).toBe('Novo Nome');
    expect(parsed.price).toBeUndefined();
  });

  it('(u) [valid] should accept only price', () => {
    const parsed = ok(updateProductBody, { price: 199.9 });
    expect(parsed.price).toBe(199.9);
  });

  it('(u) [valid] should accept all fields at once', () => {
    const payload = { name: 'Mouse', description: 'Óptico', price: 50, stockQuantity: 3 };
    const parsed = ok(updateProductBody, payload);
    expect(parsed).toEqual(payload);
  });

  it('(u) [invalid] name too short — should reject when name has fewer than 3 chars', () => {
    fail(updateProductBody, { name: 'Ab' });
  });

  it('(u) [invalid] price zero — should reject non-positive price', () => {
    fail(updateProductBody, { price: 0 });
  });

  it('(u) [invalid] price negative — should reject negative price', () => {
    fail(updateProductBody, { price: -5 });
  });

  it('(u) [invalid] stockQuantity negative — should reject negative stock', () => {
    fail(updateProductBody, { stockQuantity: -1 });
  });

  it('(u) [invalid] stockQuantity float — should reject fractional stock', () => {
    fail(updateProductBody, { stockQuantity: 0.5 });
  });

  it('(u) [valid] stockQuantity zero — should accept zero stock', () => {
    const parsed = ok(updateProductBody, { stockQuantity: 0 });
    expect(parsed.stockQuantity).toBe(0);
  });

  it('(u) [invalid] price string — should reject non-numeric price', () => {
    fail(updateProductBody, { price: 'barato' });
  });
});
