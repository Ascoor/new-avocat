import { createSlice } from '@reduxjs/toolkit';

interface ServicesState {}

const initialState: ServicesState = {};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {}
});

export default servicesSlice.reducer;
