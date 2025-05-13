import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App";
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Context } from './context/AppContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  }
])

createRoot(document.getElementById('root')).render(
  <Context>
      <RouterProvider router={router}></RouterProvider>
  </Context>
)
