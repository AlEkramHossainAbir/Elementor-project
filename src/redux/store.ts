import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './toggleSlice';
import controllerReducer from './controllerSlice'
import codeReducer from './codeSlice';

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    controller: controllerReducer,
    code:codeReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
