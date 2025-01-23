import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './toggleSlice';

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
