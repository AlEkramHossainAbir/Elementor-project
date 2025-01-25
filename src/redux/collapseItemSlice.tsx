import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import CollapsibleContainer from '../components/CollapsibleContainer';
import { TabsProps } from 'antd';

export interface IcollapseItemSlice {
  activeTabKey: string;
  tabItems: TabsProps["items"];
}
export interface ITabItems{
  key: string;
  label: string;
  children: string;
}

const initialState: IcollapseItemSlice = {
  activeTabKey: "1",
  tabItems:  [
    {
      key: "1",
      label: "Control 1",
      children: <p>text</p>,
    },
    {
      key: "2",
      label: "Control 2",
      children: <p>text</p>,
    },
    {
      key: "3",
      label: "Control 3",
      children: <p>text</p>,
    },
  ],
};

const collapseItemSlice = createSlice({
  name: 'collapseItem',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTabKey = action.payload;
    },
    addCollapseItem: (state, action: PayloadAction<{ key: string; newItem: ITabItems }>) => {
      const { key, newItem } = action.payload;
      console.log("redux", key, newItem)
      state.tabItems = state.tabItems?.map((tab) => {
        if (tab.key === key) {
          const existingItems = (tab.children as React.ReactElement)?.props.items || [];
          return {
            ...tab,
            children: <CollapsibleContainer items={[...existingItems, newItem]} />,
          };
        }
        return tab;
      });
    },
  },
});

export const { setActiveTab, addCollapseItem } = collapseItemSlice.actions;
export default collapseItemSlice.reducer;