import React from 'react'
import Product from '../../components/Product/Product'
import ProductsFetchingError from '../../components/errors/ErrorComponent'
import Loader from '../../components/loaders/Loader'
import { useProductsQuery } from '../../lib/react-query/queries'
import { useSearchParams } from "react-router-dom";
import debounce from 'lodash.debounce';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: 4,
    skip: 0
  })
  const limit = parseInt(searchParams.get('limit') || 4)
  const skip = parseInt(searchParams.get('skip') || 0)
  const q = searchParams.get('q') || ''

  const { isPending: isLoading, isError, data: products, error } = useProductsQuery(limit, skip, q)


  if (isError) {
    return <ProductsFetchingError error={error} />
  }

  const handleMove = (limit) => {
    setSearchParams((prev) => {
      prev.set('skip', Math.max(skip + limit, 0))
      return prev
    })
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">My Store</h2>
        <div className="relative mt-2 rounded-md flex items-center gap-8 mb-4">
          <input
            onChange={debounce((e) => {
              setSearchParams(prev => {
                prev.set('q', e.target.value);
                prev.delete('skip');
                return prev
              })

            }, 500)}
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
            placeholder="Search Products"
          />
        </div>
        {
          isLoading ? <Loader /> : (
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
          )
        }
        <div className="flex gap-2 mt-12">
          <button
            className="bg-purple-500 px-4 py-1 text-white rounded"
            onClick={() => { handleMove(-limit) }}>
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