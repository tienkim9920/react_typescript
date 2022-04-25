import { configureStore } from '@reduxjs/toolkit'
import { postSlice } from './post.redux'

export const store = configureStore({
  reducer: {
    post: postSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch