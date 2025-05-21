import React from 'react'

export default function Home() {
  return (
    <div className="container mx-auto p-4 justify-center items-center flex flex-col">
        <div className='mt-40'>
        <h1 className="text-5xl font-bold text-center mt-10">Welcome to the Student Management System</h1>
        <p className="text-center mt-7 text-3xl">Manage your students efficiently and effectively.</p>
        <div className="flex justify-center mt-6">
            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Login</a>
            <a href="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-4">Sign Up</a>
        </div>
        </div>
    </div>
  )
}
