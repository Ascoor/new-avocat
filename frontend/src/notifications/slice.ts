import { createSlice } from '@reduxjs/toolkit';

type NotificationsState = Record<string, unknown>;

const initialState: NotificationsState = {};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {}
});

export default notificationsSlice.reducer;
