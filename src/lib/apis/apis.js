import axios from "axios"

export const fetchProducts = () => {
  const URL = 'https://dummyjson.com/products'
  return axios.get(URL)
}

export const fetchSingleProduct = (productID) => {
  const URL = `https://dummyjson.com/products/${productID}`
  return axios.get(URL)
}
