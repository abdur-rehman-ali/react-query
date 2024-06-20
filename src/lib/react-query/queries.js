import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchSingleProduct } from "../apis/apis.js"
import { QUERY_KEYS } from './queryKeys.js'

export const useProductsQuery = (limit, skip) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, limit, skip],
    queryFn: () => fetchProducts(limit, skip),
    keepPreviousData: true,
    staleTime: Infinity
  })
}

export const useSingleProductQuery = (productID) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SINGLE_PRODUCT, productID],
    queryFn: () => fetchSingleProduct(productID),
    staleTime: Infinity
  })
}
