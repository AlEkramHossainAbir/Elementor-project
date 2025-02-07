import { createSlice } from "@reduxjs/toolkit";

interface FormState {
  [key: string]: {
    controlName: string;
    dataKey: string;
    tabId: string;
    [key: string]: string|undefined; // Allow dynamic key-value pairs
  };
}

const initialState: FormState = {};

const formSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateFormData: (
      state,
      action
    ) => {
      const { dataKey, tabId, controlName, ...otherValues } = action.payload;
      state[dataKey] = { controlName, tabId, dataKey, ...otherValues }; // Store all values
    },
  },
});

export const { updateFormData } = formSlice.actions;
export default formSlice.reducer;
