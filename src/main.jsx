import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Transfer from "./pages/Transfer.jsx"

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>
  },
  {
    path : "/login",
    element : <Login/>
  },
  {
    path : "/dashboard",
    element : <Dashboard/>
  },
  {
    path : "/transfer",
    element : <Transfer/>
  }
])

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
