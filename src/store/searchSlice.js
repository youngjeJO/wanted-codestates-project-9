import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  dataList: [],
};

const searchDataSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {
    createData(state, action) {
      state.dataList = action.payload;
      state.loading = true;
    },
    pushData(state, action) {
      localStorage.setItem(action.payload, JSON.stringify(state.dataList));
    },
    loadingData(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { pushData, createData, loadingData } = searchDataSlice.actions;
export default searchDataSlice.reducer;
