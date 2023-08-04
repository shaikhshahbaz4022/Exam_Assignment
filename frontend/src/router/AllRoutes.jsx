import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import UserPrivateRoutes from './UserPrivateRoutes'
import Recent from '../components/Recent'
import Upcoming from '../components/Upcoming'
import Admin from '../components/Admin'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={
      <UserPrivateRoutes>
      <Dashboard/>
      </UserPrivateRoutes>
      }/>
      <Route path='/recent' element={<Recent/>}/>
      <Route path='/upcoming' element={<Upcoming/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
  )
}

export default AllRoutes
