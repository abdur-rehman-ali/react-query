import React, { useState } from 'react'
import Product from '../../components/Product/Product'
import ProductsFetchingError from '../../components/errors/ErrorComponent'
import Loader from '../../components/loaders/Loader'
import { useProductsQuery } from '../../lib/react-query/queries'

const Products = () => {
  const [limit, setLimit] = useState(4)
  const [skip, setSkip] = useState(0)
  const { isPending: isLoading, isError, data: products, error } = useProductsQuery(limit, skip)

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ProductsFetchingError error={error} />
  }

  const handleMove = (limit) => {
    setSkip(prev => Math.max(prev + limit, 0))
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
        <div className="flex gap-2 mt-12">
          <button
            className="bg-purple-500 px-4 py-1 text-white rounded"
            onClick={() => {handleMove(-limit) }}>
            Prev
          </button>
          <button
            className="bg-purple-500 px-4 py-1 text-white rounded"
            onClick={() => { handleMove(limit) }}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products