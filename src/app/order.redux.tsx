import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderModel } from '../model/orders.model';
import { OrderService } from '../service/orders.service';
import type { RootState } from './store';

interface OrderSliceState {
  orders: OrderModel[],
  backupOrders: OrderModel[],
}

const initialState: OrderSliceState = {
    orders: [],
    backupOrders: [],
}

export const getOrders = createAsyncThunk('orders/get', async () => {
    return (await OrderService.GetOrder()).data;
})

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    filterDelivery: (state, action: PayloadAction<any>) => {
      state.orders = [...action.payload];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state: any, action: any) => {
      state.orders = [...action.payload];
      state.backupOrders = [...action.payload];
    });
  },
})

export const { filterDelivery } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;

