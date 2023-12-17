import { configureStore } from "@reduxjs/toolkit"
import counterReducer from './features/counter/counterSlice'
import postReducer from './features/posts/postsSlice'
import { TypedUseSelectorHook, useSelector } from "react-redux"
 
export const makeStore = () => {
    return configureStore({
      reducer: {
        counter: counterReducer,
        post: postReducer,

    }
    })
  }

  export const store = makeStore();

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

  export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;