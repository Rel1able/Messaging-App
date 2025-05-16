import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Context } from './context/AppContext';
import Chat from './components/Chat';
import ErrorPage from './components/ErrorPage';
import SignUp from './components/SignUp';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/:userId", element: <Chat /> },
    ],
    errorElement: <ErrorPage/>
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
  {
    path: "/log-in",
    element: <Login/>
  }
])

createRoot(document.getElementById('root')).render(
  <Context>
      <RouterProvider router={router}></RouterProvider>
  </Context>
)
