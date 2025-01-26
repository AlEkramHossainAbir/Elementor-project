import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IcollapseItemSlice {
  activeTabKey: string;
}
export interface ITabItems{
  key: string;
  label: string;
  children: string;
}

const initialState: IcollapseItemSlice = {
  activeTabKey: "1",
};

const activeKeySlice = createSlice({
  name: 'activeTabKey',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTabKey = action.payload;
    },
  },
});

export const { setActiveTab } = activeKeySlice.actions;
export default activeKeySlice.reducer;