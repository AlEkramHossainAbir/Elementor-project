// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Collapse, CollapseProps, Popconfirm } from "antd";
import chevronUp from "./../../assets/svgs/chevronUp.svg";
import chevronDown from "./../../assets/svgs/chevronDown.svg";
import cancelCrossIcon from "./../../assets/svgs/cancelCross.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React, { useCallback } from "react";
import { removeCollapseItem } from "../../redux/controllerSlice";


const CollapsibleContainer= ()=>{
  const dispatch = useDispatch()
  
  const activeTabKey = useSelector((state: RootState) => state.controller.activeTabKey);
  const collapseItems = useSelector((state: RootState) => state.controller.currentCollapseItems[activeTabKey] || []);



const handleDelete = (keyToDelete: string) => {
  dispatch(removeCollapseItem({ tabKey: activeTabKey, itemKey: keyToDelete }));
};
  
    const collapseOnChange = useCallback((key: string | string[]) => {
        console.log(key);
      },[]);
    
    const customProps: CollapseProps = {
        className: "custom-controller-collapse",
        expandIcon: (panelProps) => {
          return (
            <div className="collapse-controller-expand-icon">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={(e) =>{
                  e?.stopPropagation();
                  handleDelete(panelProps.panelKey); 
                }}
                onCancel={(e) => e?.stopPropagation()}
                className="controller-custom-popconfirm"
              >
                <img
                  src={cancelCrossIcon}
                  alt="cancel icon"
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </Popconfirm>
    
              {panelProps.isActive ? (
                <img src={chevronUp} alt="chevron up" />
              ) : (
                <img src={chevronDown} alt="Chevron down" />
              )}
            </div>
          );
        },
      };
    return (
        <>
        <Collapse
          items={collapseItems}
          expandIconPosition="end"
          defaultActiveKey={["1"]}
          onChange={collapseOnChange}
          {...customProps}
        />
        </>
    )
}

export default CollapsibleContainer;