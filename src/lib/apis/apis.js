import axios from "axios"

export const fetchProducts = (limit, skip, q) => {
  let URL = `https://dummyjson.com/products/search?q=${q}&limit=${limit}&skip=${skip}`
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
