import { configureStore } from '@reduxjs/toolkit'
import { blogSlice } from './blog.redux'

export const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch