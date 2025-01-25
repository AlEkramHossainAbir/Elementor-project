import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './toggleSlice';
import controllerReducer from './controllerSlice'
import collapseItemReducer from './collapseItemSlice'

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    controller: controllerReducer,
    collapseItem: collapseItemReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
