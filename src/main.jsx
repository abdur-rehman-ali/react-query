import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import Products from './pages/Products/Products';
import ProductDetail from './pages/Products/ProductDetail';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:productID",
    element: <ProductDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)

