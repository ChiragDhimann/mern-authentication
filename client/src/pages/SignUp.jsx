import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  
  const [formData,setFormData]=useState({})
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
    // console.log(formData)
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      setError(false)
    const res=await fetch('/api/auth/signup',{
      method:"POST",
      headers:{
      'Content-Type':"application/json",
      },
      body:JSON.stringify(formData),
    })
    const data=await res.json();
    // console.log(data);
    setLoading(false)
    if(data.success===false){
      setError(true)
      return
    }
    }catch(error){
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center py-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="bg-slate-100 rounded-lg p-3"
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />
        <input
          className="bg-slate-100 rounded-lg p-3"
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="bg-slate-100 rounded-lg p-3"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-semibold">Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 font-semibold">Sign in</span>
        </Link>
      </div>
      <p className="text-red-600">{error && "Something went wrong"}</p>
    </div>
  );
}
