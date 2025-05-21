import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  }

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
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
             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mt-96  w-8/12"
           >
             Logout
           </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
