import React from 'react'
import ErrorComponent from '../../components/errors/ErrorComponent'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/loaders/Loader'
import { useSingleProductQuery } from '../../lib/react-query/queries'

const ProductDetail = () => {
  const { productID } = useParams()
 
  const { isPending: isLoading, isError, data, error } = useSingleProductQuery(productID)
  const product = data?.data;

  if (isLoading) {
    return <Loader/>
  }

  if (isError) {
    return <ErrorComponent error={error} />
  }

  return (
    <div>
      {product && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <Link to={`/products/`} className='underline'>Products</Link>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Details of {product.title}</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img src={`${product.thumbnail}`} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p>
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.title}
                      </p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500"> <strong>Brand </strong>{product.brand}</p>
                    <p className="mt-1 text-sm text-gray-500"> <strong>Description </strong> {product.description}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price ? `$${product.price}` : ''}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default ProductDetail