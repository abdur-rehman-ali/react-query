import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchSingleProduct } from "../apis/apis.js"
import { QUERY_KEYS } from './queryKeys.js'

export const useProductsQuery = (limit, skip, q) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, limit, skip, q],
    queryFn: () => fetchProducts(limit, skip, q),
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
