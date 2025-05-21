import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center bg-gray-800 text-white p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
        <div className="ml-4 text-2xl font-bold">Dashboard</div>
      </div>

      {/* Sidebar */}
      <div className={`h-screen bg-gray-800 text-white flex flex-col md:w-64 w-64 md:block fixed md:relative z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Dashboard
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition w-8/12">
                Students
              </Link>
            </li>
            <li>
              <Link to="/create" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-8 transition w-8/12 pl-4">
                Add Student
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mt-auto w-8/12"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
