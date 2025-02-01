import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CollapseProps } from 'antd';

export interface ICollapseItemSlice {
  activeTabKey: string;
  currentCollapseItems: Record<string, CollapseProps["items"]>;
}

const initialState: ICollapseItemSlice = {
  activeTabKey: "1",
  currentCollapseItems: {
    "1": [],
    "2": [],
    "3": [],
  },
};

const collapseSlice = createSlice({
  name: 'collapse',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTabKey = action.payload;
    },
    addCollapseItem: (
      state,
      action
    ) => {
      const { tabKey, newItem } = action.payload;

      state.currentCollapseItems = {
        ...state.currentCollapseItems,
        [tabKey]: [...(state.currentCollapseItems[tabKey] || []), newItem],
      };
    },
    removeCollapseItem: (state, action: PayloadAction<{ tabKey: string; itemKey: string }>) => {
      state.currentCollapseItems[action.payload.tabKey] = state.currentCollapseItems[action.payload.tabKey]?.filter(
        (item) => item.key !== action.payload.itemKey
      );
    },
    reorderCollapseItems: (
      state,
      action
    ) => {
      state.currentCollapseItems[action.payload.tabKey] = action.payload.newOrder;
    },
  },
});

export const { setActiveTab, addCollapseItem, removeCollapseItem,reorderCollapseItems } = collapseSlice.actions;
export default collapseSlice.reducer;
