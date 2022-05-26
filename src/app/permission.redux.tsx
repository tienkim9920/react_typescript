import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface PermissionState {
  permission: String
}

const initialState: PermissionState = {
    permission: '',
}

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setPermission: (state, action: PayloadAction<String>) => {
      state.permission = action.payload;
    },
  }
})

export const { setPermission } = permissionSlice.actions;

export const selectPermission = (state: RootState) => state.blog;

export default permissionSlice.reducer;

