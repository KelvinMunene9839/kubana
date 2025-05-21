import React from 'react'
import { BrowserRouter ,Routes , Route } from 'react-router-dom'
import Students from './student.jsx'
import CreateStudent from './create.jsx'
import UpdateStudent from './UpdateStudent.jsx'
import Login from './auth/login.jsx'
import Signup from './auth/signup.jsx'
import Home from './home/home.jsx'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/dashboard" element={<Students/>}></Route>
          <Route path="/create" element={<CreateStudent/>}></Route>
          <Route path="/update/:id" element={<UpdateStudent/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
