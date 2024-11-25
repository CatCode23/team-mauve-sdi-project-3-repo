import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

//Routes
//import App from './App.jsx'
import ErrorPage from "./routes/error_page.jsx"
import Login from './routes/login.jsx';
import UserProfile from './routes/user_profile.jsx';
import LeaderDashboard from './routes/leader_dashboard.jsx';
import Layout from './routes/Layout.jsx';


const router = createBrowserRouter( [
  {
    path:"/",
    element: <Layout />,
    errorElement: <ErrorPage />,
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
