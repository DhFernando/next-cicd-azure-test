import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('user/getAllUsers', async (thunkApi) => {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    return data;
})

const initialState = {
    entities: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state = action.payload;
        });
    }
});
