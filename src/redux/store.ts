import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './toggleSlice';
import controllerReducer from './controllerSlice'
import codeReducer from './codeSlice';
import selectedControllerReducer from './controllerNameSlice';
import formDataReducer from './formSlice';
import widgetReducer from './widgetApiSlice';
import widgetModalReducer from './widgetModalSlice';
import formInstanceReducer from './formInstanceSlice'

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    controller: controllerReducer,
    code:codeReducer,
    selectedController: selectedControllerReducer,
    formData: formDataReducer,
    widgets: widgetReducer,
    widgetModal: widgetModalReducer,
    formInstance: formInstanceReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
