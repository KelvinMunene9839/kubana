import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'

function UpdateStudent() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:9000/student/' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          setName(res.data.Name);
          setEmail(res.data.email);
        })
        .catch(err => console.log('Error fetching student data:', err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault()
        const token = localStorage.getItem('token');
        axios.put('http://localhost:9000/update/'+id, { name: name,email: email }, {
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
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-4">Update Student</h2>
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
         <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition">Update</button>
        </form>
      </div>
    </div>
  )
}
export default UpdateStudent;
