"use client";

import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Login() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const onLogin = async () => {
        try {
            setLoading(true)
            const response =  await axios.post(`/api/users/login`, user)
            console.log("login successful", response.data)
            router.push("/profile")
        } catch (error: any) { 
            toast.error(error.message)
        }finally{
            setLoading(false)   
        }
    }

    useEffect(()=>{
        if( user.password.length > 0 &&  user.email.length > 0 ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user]);

  return (
    <div className='flex flex-col'>
        <h1 className='text-center text-white text-2xl'>
            production - v - Login
        </h1> 
        <div>
            <label htmlFor="" className='p-2'>email</label>
            <input type="text" className='text-black mb-5' value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}/>
        </div>
        <div>
            <label htmlFor="" className='p-2'>password</label>
            <input type="password" className='text-black mb-5' value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
        </div>

        <button onClick={onLogin} disabled={buttonDisabled}>Login</button>
        <Link href='/signup'>Signup</Link>
    </div>
  )
}
