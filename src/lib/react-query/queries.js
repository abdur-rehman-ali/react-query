import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchSingleProduct } from "../apis/apis.js"
import { QUERY_KEYS } from './queryKeys.js'

export const useProductsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: fetchProducts,
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
