import { createSlice } from '@reduxjs/toolkit';

interface SessionsState {}

const initialState: SessionsState = {};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {}
});

export default sessionsSlice.reducer;
