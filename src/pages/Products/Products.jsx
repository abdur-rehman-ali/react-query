import React from 'react'
import Product from '../../components/Product/Product'
import ProductsFetchingError from '../../components/errors/ErrorComponent'
import Loader from '../../components/loaders/Loader'
import { useProductsQuery } from '../../lib/react-query/queries'

const Products = () => {
  const { isPending: isLoading, isError, data: products, error } = useProductsQuery()

  if (isLoading) {
    return <Loader/>
  }

  if (isError) {
    return <ProductsFetchingError error={error} />
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Best selling products</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
            products.data.products.length > 0 && products.data.products.map(product => (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                brand={product.brand}
                thumbnail={product.thumbnail}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Products