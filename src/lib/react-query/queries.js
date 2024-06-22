import { useQuery } from '@tanstack/react-query'
import {
  fetchCommentsByPostId,
  fetchPostById,
  fetchProducts,
  fetchProductsCategories,
  fetchSingleProduct
} from "../apis/apis.js"
import { QUERY_KEYS } from './queryKeys.js'

export const useProductsQuery = (limit, skip, q, category) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, limit, skip, q, category],
    queryFn: () => fetchProducts(limit, skip, q, category),
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

export const useProductsCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_CATEGORIES],
    queryFn: fetchProductsCategories,
    staleTime: Infinity
  })
}

export const usePost = (postId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST, postId],
    queryFn: () => fetchPostById(postId),
  });
}

export const usePostComments = (post) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST_COMMENTS, post?.id],
    queryFn: () => fetchCommentsByPostId(post?.id),
  });
}
