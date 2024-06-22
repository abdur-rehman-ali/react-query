import axios from "axios"

export const fetchProducts = (limit, skip, q, category) => {
  let URL = `https://dummyjson.com/products/search?q=${q}&limit=${limit}&skip=${skip}`
  if (category) {
    URL = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
  }
  return axios.get(URL)
}

export const fetchSingleProduct = (productID) => {
  const URL = `https://dummyjson.com/products/${productID}`
  return axios.get(URL)
}

export const fetchProductsCategories = () => {
  const URL = `https://dummyjson.com/products/category-list`
  return axios.get(URL)
}

export const fetchPostById = async (postId) => {
  if (!postId) return
  const URL = `https://dummyjson.com/posts/${postId}`
  const { data } = await axios.get(URL)
  return data
};

export const fetchCommentsByPostId = async (postId) => {
  if (!postId) return
  const URL = `https://dummyjson.com/comments/post/${postId}`
  const { data } = await axios.get(URL)
  return data.comments
};
