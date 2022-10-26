import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateProfile from './pages/users/CreateProfile'
import Header from './pages/Header'
import Home from './pages/users/Home'
import Signin from './pages/users/Signin'
import Signup from './pages/users/Signup'
import HealthProfile from './pages/users/HealthProfile'
import BookAppointment from './pages/users/BookAppointment'
import AdminHome from './pages/admin/Home'
import UserAppointment from './pages/admin/UserAppointment'

function App() {

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/createProfile" element={<CreateProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/healthProfile" element={<HealthProfile />} />
          <Route path="/bookAppointment" element={<BookAppointment />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/userAppointment" element={<UserAppointment />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
