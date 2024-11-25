import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowseerRouter, RouterProvider } from "react-router-dom";
import './index.css'

//Routes
//import App from './App.jsx'
import ErrorPage from "./routes/error_page.jsx"



const router = createBrowserRouter( [
  {
    path:"/",
    element: <Layout />,
    errorChild: <ErrorPage />,
    children: [
      {
        index: "/",
        element: <Login />
      },
      {
        path: "/User-Profile",
        element: <UserProfile />
      },
      {
        path: "/Leader-Dashboard",
        element: <LeaderDashboard />
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
