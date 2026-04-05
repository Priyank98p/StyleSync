import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState("Login")
  const onSubmitHandler = (e) =>{
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmitHandler} action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-3 mt-10'>
        <p className='text-3xl'>{currentState}</p>

      </div>
      {currentState === 'Login' ? '' : <input required type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Full Name' />}
      <input required type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter email address' />
      <input required type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter password' />

      <div className='w-full flex justify-between text-sm -mt-2'>
        <p className='cursor-pointer'>Forgot your password</p>
        {
          currentState === 'Login' ? <p onClick={() => setCurrentState("Sign-up")} className='cursor-pointer text-blue-800'>Create Account</p> : <p onClick={() => setCurrentState("Login")} className='cursor-pointer text-blue-800'>Sign in</p>
        }
      </div>
      <button className='bg-black text-white p-3 rounded-4xl w-[30%] cursor-pointer'>{currentState === "Login" ? "Sign in" : "Sign up"}</button>
    </form>
  )
}

export default Login