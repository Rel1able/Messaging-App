import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Context } from './context/AppContext';
import Chat from './components/Chat';
import ErrorPage from './components/ErrorPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Chat /> },
    ],
    errorElement: <ErrorPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <Context>
      <RouterProvider router={router}></RouterProvider>
  </Context>
)
