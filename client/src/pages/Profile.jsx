import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import {getDownloadURL, getStorage, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { ref } from "firebase/storage";

export default function Profile() {
  const [image,setImage]=useState(undefined)
  const [uploadPercent,setUploadPercent]=useState(0)
  const [imageError,setImageError]=useState(false)
  const [formData,setFormData]=useState({})
  console.log(formData);
  const fileRef=useRef(null)
  const { currentUser } = useSelector((state) => state.user);

  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image]);

  const handleFileUpload=async (image)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+image.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,image)
    uploadTask.on('state_changed',(snapshot)=>{
      const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setUploadPercent(Math.round(progress))
    },
    (error)=>{
      setImageError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
        setFormData({...formData,profilePicture:downloadURL}))
    }
  )
  }
  
  

  

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} accept="image/*" hidden
        onChange={(e)=>setImage(e.target.files[0])}/>
        <img
          src={formData.profilePicture||currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 rounded-full object-cover self-center my-2"
          onClick={()=>{fileRef.current.click()}}
        />
        <p className="text-sm self-center">
          {
            imageError ?
            (<span className="text-red-600">
              Error Uploading image (size must be less then 2MB)
            </span>):(
              uploadPercent>0 && uploadPercent<100 ?(
                <span className="text-slate-700">{`Uploading ${uploadPercent}%`}</span>
              ):uploadPercent===100?(
                <span className="text-green-600">Image upload Successfully</span>
              ):('')
            )
          }
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button className="bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80 text-white">
          update
        </button>
      </form>
      <div className="flex justify-between mt-2">
        <span className="text-red-700 cursor-pointer font-semibold ">Delete Account</span>
        <span className="text-red-700 cursor-pointer font-semibold">Sign Out</span>
      </div>
    </div>
  );
}
