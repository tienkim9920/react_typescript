import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderModel } from '../model/orders.model';
import { UpdateDelivery } from '../pattern/home.pattern';
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

export const updateDelivery = createAsyncThunk('orders/updateDelivery', async (updateDelivery: UpdateDelivery) => {
  const id = updateDelivery.id;
  const delivery = updateDelivery.delivery === '4' ? updateDelivery.delivery : (Number(updateDelivery.delivery) + 1).toString();
  return (await OrderService.UpdateDelivery(id, delivery)).data;
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

    builder.addCase(updateDelivery.fulfilled, (state: any, action: any) => {
      const index = state.orders.findIndex((item: OrderModel) => {
        return item.id === Number(action.payload.id);
      })
      state.orders[index].delivery = action.payload.delivery;
      state.backupOrders[index].delivery = action.payload.delivery;
    })
  },
})

export const { filterDelivery } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;

