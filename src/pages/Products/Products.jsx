import React from 'react'
import Product from '../../components/Product/Product'
import ProductsFetchingError from '../../components/errors/ErrorComponent'
import Loader from '../../components/loaders/Loader'
import { useProductsCategories, useProductsQuery } from '../../lib/react-query/queries'
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
  const category = searchParams.get('category') || ''

  const { isPending: isLoading, isError, data: products, error } = useProductsQuery(limit, skip, q, category)
  const { data: categories } = useProductsCategories()

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
                prev.delete('category')
                return prev
              })

            }, 500)}
            type="text"
            name="searchBar"
            id="searchBar"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
            placeholder="Search Products"
          />
          <select className="border rounded-md p-2" onChange={(e) => {
            setSearchParams((prev) => {
              prev.set('category', e.target.value)
              prev.delete('q')
              return prev
            })
           }}>
            <option>Select category</option>
            {categories?.data.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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
            disabled={skip < limit}
            className="bg-purple-500 px-4 py-1 text-white rounded"
            onClick={() => { handleMove(-limit) }}>
            Prev
          </button>
          <button
            disabled={limit + skip > products?.data?.total}
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