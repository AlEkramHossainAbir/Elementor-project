import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormInstance } from "antd";

interface FormState {
  formInstance: FormInstance | null;
}

const initialState: FormState = {
  formInstance: null,
};

const formInstanceSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormInstance: (state, action: PayloadAction<FormInstance | null>) => {
      state.formInstance = action.payload;
    },
    submitForm: (state) => {
      if (state.formInstance) {
        state.formInstance.submit(); // ✅ This will work now
      }
    },
  },
});

export const { setFormInstance, submitForm } = formInstanceSlice.actions;
export default formInstanceSlice.reducer;
