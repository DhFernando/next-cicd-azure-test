"use client";
 
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react' 
import { useDispatch } from 'react-redux';
import { decrement,increment } from '@/redux/features/counter/counterSlice'
import { fetchPosts, postAdded } from '@/redux/features/posts/postsSlice'
import { useAppSelector } from '@/redux/store';

export default function Signup() {
    const router = useRouter()
    const dispatch  = useDispatch()
    const count = useAppSelector((state) => state.counter.count)
    const posts = useAppSelector((state) => state.post.posts) || []
    
    const [newPost, setNewPost] = useState({
        title: '',
        content: ''
    });

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
  
    const addNewPost = () => {
        console.log(newPost)
        dispatch(postAdded(newPost))
        setNewPost({
            title: '',
            content: ''
        })
    }

    useEffect(()=>{
        console.log(count)
    }, [count])

    useEffect(()=>{
        if(user.username.length > 0 && user.password.length > 0 &&  user.email.length > 0 ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user]);

  return (
    <div className='flex flex-col'>
        <h1>{count}</h1>
         <div>
            <button onClick={()=> dispatch(increment())} className='p-2 bg-red-600 rounded-lg'>+</button>
            <button onClick={()=> dispatch(decrement())} className='p-2 bg-red-600 rounded-lg'>-</button>
        </div>
        <hr />
        <h2>posts</h2>
        {JSON.stringify(newPost)}
        <input type="text" onChange={(e)=> { setNewPost({ ...newPost, title: e.target.value }) }}/>
        <input type="text" onChange={(e)=> { setNewPost({ ...newPost, content: e.target.value }) }}/> 
        <button onClick={()=>addNewPost()}>Add new post</button>
        {/* <button onClick={() => dispatch(fetchPosts())}>fetch post</button> */}
        {posts.map(p=>(<div key={p.id}>{JSON.stringify(p)}</div>))}
    </div>
  )
}
