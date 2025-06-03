import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Context } from './context/AppContext';
import Chat from './components/Chat';
import ErrorPage from './components/ErrorPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import Users from './components/Users';
import Contacts from './components/Contacts';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/chat/:userId", element: <Chat /> },
      { path: "/profile/:userId", element: <Profile /> },
      { path: "/users", element: <Users /> },
      { path: "/messages", element: <Contacts /> },
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
