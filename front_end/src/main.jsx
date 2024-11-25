import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


//Routes
//import App from './App.jsx'
import Layout from './routes/layout.jsx';
import ErrorPage from "./routes/error_page.jsx";
import Login from "./routes/login.jsx";
import LeaderDashboard from "./routes/leader_dashboard.jsx";
import UserProfile from "./routes/user_profile.jsx";

import './index.css'

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
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
