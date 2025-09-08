import { createSlice } from '@reduxjs/toolkit';

interface ProceduresState {}

const initialState: ProceduresState = {};

const proceduresSlice = createSlice({
  name: 'procedures',
  initialState,
  reducers: {}
});

export default proceduresSlice.reducer;
