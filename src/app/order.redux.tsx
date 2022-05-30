import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderDetail } from '../interface/orders-detail.interface';
import { OrderDetailModel } from '../model/orders-detail.model';
import { OrderModel } from '../model/orders.model';
import { UpdateDelivery } from '../pattern/home.pattern';
import { OrderService } from '../service/orders.service';
import type { RootState } from './store';

interface OrderSliceState {
  orders: OrderModel[],
  backupOrders: OrderModel[],
  filter: String,
  orderDetails: OrderDetailModel[]
}

const initialState: OrderSliceState = {
  orders: [],
  backupOrders: [],
  filter: 'all',
  orderDetails: []
}

export const getOrderDetail = createAsyncThunk('orders-detail/get', async (orderId: String) => {
  return (await OrderService.DetailOrder(orderId)).data;
})

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
    },
    filterStatus: (state, action: PayloadAction<any>) => {
      state.filter = action.payload;
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
      if (state.filter !== 'all'){
        state.orders.splice(index, 1);
      }else {
        state.orders[index].delivery = action.payload.delivery;
      }

      const indexBackup = state.backupOrders.findIndex((item: OrderModel) => {
        return item.id === Number(action.payload.id);
      })
      state.backupOrders[indexBackup].delivery = action.payload.delivery;
    });

    builder.addCase(getOrderDetail.fulfilled, (state: any, action: any) => {
      state.orderDetails = [...action.payload];
    })
  },
})

export const getDetailOrder = (id: String) => createSelector(
  (state: RootState) => state.order.orders,
  (items) => {
    const index = items.findIndex((element: OrderModel) => {
      return element.id?.toString() === id;
    })
    return items[index];
  }
);

export const { filterDelivery, filterStatus } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;