import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl font-semibold text-center py-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
      <input className='bg-slate-100 rounded-lg p-3' type="text" placeholder='username' id='username' />
      <input className='bg-slate-100 rounded-lg p-3' type="email" placeholder='email' id='email' />
      <input className='bg-slate-100 rounded-lg p-3' type="password" placeholder='password' id='password' />
      <button className='bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80'>sign up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='font-semibold'>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500 font-semibold' >Sign in</span>
        </Link>
      </div>
    </div>
  )
}
