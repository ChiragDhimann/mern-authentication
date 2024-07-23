import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignIn() {

  const [formData,setFormData]=useState({})
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
    // console.log(formData)
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      setError(false)
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      // console.log(data);
      setLoading(false)
      if(data.success===false){
        setError(true)
        return;
      }
      navigate('/');
    }catch(error){
      setError(true)
      setLoading(false)
    }

  }

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center py-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button className="bg-slate-700 rounded-lg p-3 text-white hover:opacity-95 disabled:opacity-85">
          {loading ? 'Loading...':'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-semibold">Don't have an account</p>
        <Link to="/sign-up">
          <span className="font-semibold text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-600 text-[20px] mt-2">{error && 'Something went wrong'}</p>
    </div>
  );
}
