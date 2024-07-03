import { useState } from 'react'
import Error from './pages/Error'
import './App.css'
import {Route,Routes} from'react-router-dom'
import Home from "./pages/Home"
import Navbar from './components/common/Navbar'
import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login'
import Signup from './pages/Singup'


function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
         <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App