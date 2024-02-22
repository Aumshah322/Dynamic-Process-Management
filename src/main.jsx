import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './layout.jsx'
import LoginPage from './components/login'
import Dashboard from './components/dashboard.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import SignUp from './components/signup.jsx'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<Layout/>} >
      <Route path='' element= {<LoginPage/>}/>
      <Route path='dashboard' element= {<Dashboard/>}/>
      <Route path='signUp' element= {<SignUp/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
