import { configureStore } from '@reduxjs/toolkit'
import { blogSlice } from './blog.redux'
import { orderSlice } from './order.redux'
import { permissionSlice } from './permission.redux'

export const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    permission: permissionSlice.reducer,
    order: orderSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch