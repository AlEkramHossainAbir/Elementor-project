import { Collapse, CollapseProps, Popconfirm } from "antd";
import chevronUp from "./../../assets/svgs/chevronUp.svg";
import chevronDown from "./../../assets/svgs/chevronDown.svg";
import cancelCrossIcon from "./../../assets/svgs/cancelCross.svg";


const collapseItems: CollapseProps["items"] = [
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
  ];
  interface CollapsibleContainerProps {
    items: CollapseProps["items"];
  }
const CollapsibleContainer: React.FC<CollapsibleContainerProps> = ({items})=>{
    const collapseOnChange = (key: string | string[]) => {
        console.log(key,items);
      };
    
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
                onConfirm={(e) => e?.stopPropagation()}
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