import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: [],
  localData: localStorage,
};

const searchDataSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {
    createData(state, action) {
      state.searchData = action.payload;
    },
    pushData(state, action) {
      state.localData.setItem(action.payload, JSON.stringify(state.searchData));
    },
  },
});

export const { pushData, createData } = searchDataSlice.actions;
export default searchDataSlice.reducer;
