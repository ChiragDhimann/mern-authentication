import React from "react";
import{ GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import {useNavigate} from 'react-router-dom'

export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleSubmit=async()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth,provider);
            const res=await fetch('/api/auth/google',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,
                }),
            });
            
            const data=await res.json();
            dispatch(signInSuccess(data))
            navigate('/')
            // console.log(result);
        }catch(error){
            // console.log(app);
            console.log("could not login with google",error)
        }
    }
  return (
    <button
      type="button"
      className="bg-red-700 text-white rounded-lg p-3 hover:opacity-85"
      onClick={handleGoogleSubmit}
    >
      Continue with Google
    </button>
  );
}
