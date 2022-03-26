import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  preventData: [],
};

const searchDataSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {
    createData(state, action) {
      state.preventData = action.payload;
    },
    pushData(state, action) {
      localStorage.setItem(action.payload, JSON.stringify(state.preventData));
    },
  },
});

export const { pushData, createData } = searchDataSlice.actions;
export default searchDataSlice.reducer;
