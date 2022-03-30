import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataList: [],
};

const searchDataSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {
    createData(state, action) {
      state.dataList = action.payload;
    },
    pushData(state, action) {
      localStorage.setItem(action.payload, JSON.stringify(state.preventData));
    },
  },
});

export const { pushData, createData } = searchDataSlice.actions;
export default searchDataSlice.reducer;
