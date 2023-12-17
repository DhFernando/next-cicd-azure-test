"use client";

import axios from 'axios';
import Link from 'next/link' 
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Signup() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response =  await axios.post(`/api/users/signup`, user)
            console.log("signup successful", response.data)
            router.push("/login")
        } catch (error: any) { 
            toast.error(error.message)
        }finally{
            setLoading(false)   
        }
        console.log(user)
    }

    useEffect(()=>{
        if(user.username.length > 0 && user.password.length > 0 &&  user.email.length > 0 ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user]);

  return (
    <div className='flex flex-col'>
        <h1 className='text-center text-white text-2xl'>
            {loading ? 'Processing...!' : 'Signup'}
        </h1> 
        <div>
            <label htmlFor="" className='p-3'>username</label>
            <input type="text" className='text-black mb-5' value={user.username} onChange={(e)=>setUser({...user, username: e.target.value})}/>
        </div>
        <div>
            <label htmlFor="" className='p-2'>email</label>
            <input type="text" className='text-black mb-5' value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}/>
        </div>
        <div>
            <label htmlFor="" className='p-2'>password</label>
            <input type="password" className='text-black mb-5' value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
        </div>

        <button onClick={onSignup} disabled={buttonDisabled} >Signup</button>
        <Link href='/login'>Login</Link>
    </div>
  )
}
