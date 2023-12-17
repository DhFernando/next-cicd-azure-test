'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Profile() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    const response =  await axios.post(`/api/users/logout`)
    console.log("logout successful", response.data)
    router.push("/login")
  }

  const getUserProfile = async () => {{
    const response =  await axios.get(`/api/users/me`)
    console.log(response.data)
  }}

  useEffect(()=>{
    getUserProfile()
  }, [])

  return (
    <div>
        <div>Profile</div>
        <button 
          className='bg-yellow-400 p-2 text-black rounded-lg'
          disabled={buttonDisabled}
          onClick={logout}
        >
          {
            buttonDisabled ? "Logging Out ..." : "logout"
          }
        </button>
    </div>
  )
}
