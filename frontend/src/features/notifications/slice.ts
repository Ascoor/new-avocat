import { createSlice } from '@reduxjs/toolkit';

interface NotificationsState {}

const initialState: NotificationsState = {};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {}
});

export default notificationsSlice.reducer;
