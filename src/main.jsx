import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './layout.jsx'
import LoginPage from './components/login'
import Dashboard from './components/UserForm/dashboard.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import SignUp from './components/signup.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'
import FDashboard from './components/FormMaster/dashboard.jsx'


// const PrivateRoute = async () => {
//   const authService = new AuthService();
//   const userData = await authService.signin(details);
//   return (
//     userData.token ? <Outlet /> : <Navigate to="/login" />
//   )
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='dashboard' element={<Dashboard />} />

      </Route>
      <Route path='formMaster' element={<FDashboard />} />
      <Route path='signUp' element={<SignUp />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
