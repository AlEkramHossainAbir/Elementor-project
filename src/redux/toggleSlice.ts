import { createSlice } from '@reduxjs/toolkit';

export interface ToggleState {
  showContent: boolean;
}

const initialState: ToggleState = {
  showContent: false,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleContent: (state) => {
      state.showContent = !state.showContent;
    },
  },
});

export const { toggleContent } = toggleSlice.actions;
export default toggleSlice.reducer;
