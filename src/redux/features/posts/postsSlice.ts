import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const postURI = 'https://jsonplaceholder.typicode.com/posts';

interface Post {
    id: number;
    title: string;
    content: string;
}

interface State {
    posts: Post[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    errorMessage: string | undefined;
}

const initialState: State = { 
    posts: [
        {id: 1, title: 'posts one title', content: 'post one body content'},
        {id: 2, title: 'posts two title', content: 'post two body content'},
        {id: 3, title: 'posts three title', content: 'post three body content'},
    ],
    status: 'idle', // 'idle', loadingm successfullym failed
    errorMessage: undefined
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        console.log('fetchPosts')
        const response = await axios.get(postURI); 
        return [...response.data]
    } catch (error: any) {
        return error.message;
    }
})

export const counterSlice = createSlice({
    name: 'post',
    initialState,
    reducers: { 
        postAdded:  {
            reducer: (state, action: PayloadAction<any>) => {
                state.posts.push(action.payload) 
            },
            prepare: (post) => ({
                payload: {
                  id: nanoid(),
                  ...post
                }
              })
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload
            state.status = 'success'
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.errorMessage = action.error.message
        })
    }
})

export const { postAdded } = counterSlice.actions 
export default counterSlice.reducer