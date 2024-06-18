import axios from "axios"

export const fetchProductsFromEndpoint = async () => {
  const URL = 'https://dummyjson.com/products'
  const response = await axios.get(URL)
  const data = response.data.products
  return data;
}

export const fetchSingleProductFromEndpoint = async (id=1) => { 
  const URL = `https://dummyjson.com/products/${id}`
  const response = await axios.get(URL)
  const data = response.data  
  return data;
}