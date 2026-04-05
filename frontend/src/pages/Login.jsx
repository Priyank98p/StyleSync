import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up")
  return (
    <form action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-3 mt-10'>
        <p className='text-3xl'>{currentState}</p>

      </div>
      <input required type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Full Name' />
      <input required type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter email address' />
      <input required type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter password' />
    </form>
  )
}

export default Login