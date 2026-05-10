// Libraries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// Services
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from '../../shared/services/product.service';
// Types
import type { ProductPayload } from '../schemas/product.schema';

export const productQueryKeys = {
  list: (query = '') => ['products', { query }] as const,
  detail: (id: string) => ['products', id] as const,
}

export function useProducts(query = '', enabled = true) {
  return useQuery({
    queryKey: productQueryKeys.list(query),
    queryFn: () => listProducts(query),
    enabled,
  })
}

export function useProduct(id?: string) {
  return useQuery({
    queryKey: id ? productQueryKeys.detail(id) : ['products', 'empty'],
    queryFn: () => getProductById(id ?? ''),
    enabled: Boolean(id),
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ProductPayload) => updateProduct(id, payload),
    onSuccess: (product) => {
      queryClient.setQueryData(productQueryKeys.detail(id), product)
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
