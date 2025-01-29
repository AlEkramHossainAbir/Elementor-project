// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CollapseProps } from 'antd';

export interface ICollapseItemSlice {
  activeTabKey: string;
  currentCollapseItems: Record<string, CollapseProps["items"]>;
}

const initialState: ICollapseItemSlice = {
  activeTabKey: "1",
  currentCollapseItems: {
    "1": [{ key: "1", label: "Control test", children: <p>Content for Control 1</p> }],
    "2": [{ key: "1", label: "Style 1", children: <p>Content for Style 1</p> }],
    "3": [{ key: "1", label: "Advanced 1", children: <p>Content for Advanced 1</p> }],
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
      action: PayloadAction<{ tabKey: string; newItem: CollapseProps["items"][number] }>
    ) => {
      const { tabKey, newItem } = action.payload;
      console.log("Adding item to Redux:", tabKey, newItem);

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
  },
});

export const { setActiveTab, addCollapseItem, removeCollapseItem } = collapseSlice.actions;
export default collapseSlice.reducer;
