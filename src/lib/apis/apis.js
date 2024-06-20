import axios from "axios"

export const fetchProducts = (limit, skip) => {
  const URL = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  return axios.get(URL)
}

export const fetchSingleProduct = (productID) => {
  const URL = `https://dummyjson.com/products/${productID}`
  return axios.get(URL)
}
