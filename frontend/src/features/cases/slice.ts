import { createSlice } from '@reduxjs/toolkit';

interface CasesState {}

const initialState: CasesState = {};

const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {}
});

export default casesSlice.reducer;
