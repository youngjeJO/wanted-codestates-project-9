import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';

const rootReducer = combineReducers({
  searchSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
