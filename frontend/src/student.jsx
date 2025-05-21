import React, { useEffect } from 'react'
import axios from 'axios' 
import { Link } from 'react-router-dom'
import Sidebar from './sidebar/sidebar'


export default function Students() {
    const [students, setStudents] = React.useState([])


    useEffect(()=>{
     const token = localStorage.getItem('token');
     axios.get('http://localhost:9000/students', {
       headers: {
         Authorization: `Bearer ${token}`
       }
     })
     .then(res=> setStudents(res.data))
     .catch(err=> console.log(err));
    },[])

    const handleDelete = async (id) => {
      try{
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:9000/delete/' + id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        window.location.reload();
      }catch(err){
         console.log(err);  
      }
   }


  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow container mx-auto p-4">
        
         <div className="bg-white rounded-lg shadow-md p-6 mt-16">
            <table className="min-w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                   {
                      students.map((data , i) => (
                         <tr key={i} className="border-b border-gray-300 text-black hover:bg-gray-100">
                          <td className="border border-gray-300 px-4 py-2">{data.Name}</td>
                          <td className="border border-gray-300 px-4 py-2">{data.email}</td>
                          <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                             <Link to={`/update/${data.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                               Update
                             </Link>
                             <button  className="bg-red-400 text-white px-3 py-1 rounded  select-none" onClick={() => handleDelete(data.id)}>
                               Delete
                             </button>
                          </td>
                         </tr>
                      ))
                   }
                </tbody>
            </table>
         </div>
      </div>
    </div>
  )
}
