import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './sidebar/sidebar'

function CreateStudent() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault()
        const token = localStorage.getItem('token');
        axios.post('http://localhost:9000/create', {name: name,email: email }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res =>{
            console.log(res);
            navigate('/dashboard');
        })
    }
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-4">Add Student</h2>
              <div>
                  <label htmlFor="name" className="block font-medium mb-1">Name</label>
                  <input type="text" id="name" name="Name" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required
                  value={name}
                  onChange={ e=>setName(e.target.value)} />
              </div>
              <div>
                  <label htmlFor="email" className="block font-medium mb-1">Email</label>
                  <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required
                  value={email}
                  onChange={ e=>setEmail(e.target.value)} />
              </div>
           <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default CreateStudent;
