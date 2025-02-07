import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WidgetBuilderState {
  isOpen: boolean;
  selectedWidgetId: number | null;
}

const initialState: WidgetBuilderState = {
    isOpen: false,
    selectedWidgetId: null,
};

const widgetModalSlice = createSlice({
  name: 'widgetModal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<number>) => {
      state.isOpen = true;
      state.selectedWidgetId = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedWidgetId = null;
    },
  },
});

// Export actions
export const { openModal, closeModal } = widgetModalSlice.actions;

// Export reducer
export default widgetModalSlice.reducer;

