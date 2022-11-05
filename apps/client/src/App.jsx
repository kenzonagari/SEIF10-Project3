import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './pages/Footer'

import CreateProfile from './pages/users/CreateProfile'
import Home from './pages/users/Home'
import Signin from './pages/users/Signin'
import Signup from './pages/users/Signup'
import HealthProfile from './pages/users/HealthProfile'
import BookAppointment from './pages/users/BookAppointment'

import AdminHome from './pages/admin/Home'
import UserAppointment from './pages/admin/UserAppointment'
import UserApptUpdate from './pages/admin/UserApptUpdate'
import UserProfileUpdate from './pages/admin/UserProfileUpdate'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/createProfile" element={<CreateProfile />} />
          <Route path="/home" element={<Home page="userProfile" />} />
          <Route path="/healthProfile" element={<Home page="healthProfile" />} />
          <Route path="/bookAppointment" element={<Home page="bookAppointment" />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/userAppointment" element={<UserAppointment />} />
          <Route path="/admin/userApptUpdate" element={<UserApptUpdate />} />
          <Route path="/admin/userProfileUpdate" element={<UserProfileUpdate />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
