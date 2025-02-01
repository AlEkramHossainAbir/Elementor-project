import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface controllerState {
  selectedController: string;
}

const initialState: controllerState = {
    selectedController: '',
};

const controllerSlice = createSlice({
  name: 'selectedController',
  initialState,
  reducers: {
    controllerContent: (state, action: PayloadAction<string>) => {
        state.selectedController = action.payload;
      },
  },
});

export const { controllerContent } = controllerSlice.actions;
export default controllerSlice.reducer;
