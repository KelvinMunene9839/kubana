import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        // Save token in localStorage
        localStorage.setItem('token', data.token)
        navigate('/dashboard')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch {
      setError('Network error')
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} method="post" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-md py-2 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <h4 className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to='/signup' className="text-blue-600 hover:underline font-semibold">
              Create Account
            </Link>
          </h4>
        </form>
      </div>
    </div>
  )
}

export default Login
