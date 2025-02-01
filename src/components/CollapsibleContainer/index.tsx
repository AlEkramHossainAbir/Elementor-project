// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Collapse, CollapseProps, Popconfirm } from "antd";
import chevronUp from "./../../assets/svgs/chevronUp.svg";
import chevronDown from "./../../assets/svgs/chevronDown.svg";
import cancelCrossIcon from "./../../assets/svgs/cancelCross.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCallback, useEffect, useRef } from "react";
import { removeCollapseItem, reorderCollapseItems } from "../../redux/controllerSlice";
import Sortable from "sortablejs";

const CollapsibleContainer= ()=>{
  const dispatch = useDispatch()
  
  const activeTabKey = useSelector((state: RootState) => state.controller.activeTabKey);
  const collapseItems = useSelector((state: RootState) => state.controller.currentCollapseItems[activeTabKey] || []);

  const collapseRef = useRef<HTMLDivElement>(null);

const handleDelete = (keyToDelete: string) => {
  dispatch(removeCollapseItem({ tabKey: activeTabKey, itemKey: keyToDelete }));
};
  
    const collapseOnChange = useCallback((key: string | string[]) => {
        console.log(key);
      },[]);
      useEffect(() => {
        if (collapseRef.current) {
          const sortable = new Sortable(collapseRef.current, {
            animation: 150,
            handle: ".draggable-icon", // Only allow dragging when clicking on the icon
            onEnd: (event: Sortable.SortableEvent) => {
              const { oldIndex, newIndex } = event;
              if (oldIndex === newIndex) return;
    
              const reorderedItems = [...collapseItems];
              const [movedItem] = reorderedItems.splice(oldIndex, 1);
              reorderedItems.splice(newIndex, 0, movedItem);
    
              dispatch(reorderCollapseItems({ tabKey: activeTabKey, newOrder: reorderedItems }));
            }
          });
    
          return () => sortable.destroy();
        }
      }, [collapseItems, dispatch]);
    const customProps: CollapseProps = {
        className: "custom-controller-collapse",
        expandIcon: (panelProps) => {
          return (
            <div className="collapse-controller-expand-icon">
              <Popconfirm
                title="Delete the Controller"
                description="Are you sure to delete this Controller?"
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
          ref={collapseRef}
          {...customProps}
        />
        </>
    )
}

export default CollapsibleContainer;