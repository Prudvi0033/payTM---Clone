import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className='bg-zinc-950 w-full montserrat  h-screen flex justify-center items-center'>
      <div className='bg-white  text-black p-6 rounded-lg'>
        <h1 className='text-3xl text-center  font-semibold'>Login</h1>
        <p className='text-sm w-full text-center text-gray-500 font-normal'>Enter your information to Login</p>
        <div className='p-2'>
          <label className='text-md font-medium'>Username</label><br />
          <input onChange={(e) => {setUsername(e.target.value)}} className='w-full border border-gray-400 p-1 rounded-md mb-2' placeholder='xyz@gmail.com' />
          <label className='text-md font-medium'>Password</label><br />
          <input onChange={(e) => {setPassword(e.target.value)}} className='w-full border border-gray-400 p-1 rounded-md mb-2' placeholder='123456' />
          <Link to="/dashboard" className="w-full block text-center mt-2 px-8 py-2 bg-black mb-2 text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">Login</Link>
          <span className='block w-full text-sm text-gray-400 text-center'>Don't have an account <Link className='text-gray-500 font-medium underline' to="/">Signup</Link></span>
        </div>
      </div>
    </div>
  )
}

export default login