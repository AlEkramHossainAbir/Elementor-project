import desktopIcon from "./../../assets/svgs/desktop.svg";
import tabIcon from "./../../assets/svgs/tab.svg";
import mobileIcon from "./../../assets/svgs/mobile.svg";
import { Button, Collapse, CollapseProps, Tabs, TabsProps } from "antd";
import plusIcon from "./../../assets/svgs/plus_icon.svg";
import minusIcon from "./../../assets/svgs/minus_icon.svg";
import previewIcon from "./../../assets/svgs/preview-icon.svg";
import infoIcon from "./../../assets/svgs/info-icon.svg";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { submitForm } from "../../redux/formInstanceSlice";
import { useEffect } from "react";
import { storeWidget } from "../../redux/widgetApiSlice";

const RightSidebar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const formData = useSelector((state:RootState) => state.formData);
  const codeData = useSelector((state:RootState) => state.code.codeByTab);
  const { widgetDetails } = useSelector((state: RootState) => state.widgets);
  const {selectedWidgetId} = useSelector((state: RootState) => state.widgetModal)

  console.log(selectedWidgetId && widgetDetails[selectedWidgetId])

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const submitResponse = () => {
    dispatch(submitForm())
    setTimeout(() => {
      if (!selectedWidgetId) {
        console.error("No widget selected!");
        return;
      }
      const widgetData = {
        description: "A custom Elementor heading widget with advanced styling options",
        markup: codeData?.HTML,
        icon: "",
        controls: formData,
        settings: {
          title: formData.title ?? "Default Heading",
          description: formData.description ?? "Default description text",
          icon: formData.icon ?? "",
          category: formData.category ?? "",
        },
        css: codeData?.CSS,
        js: codeData?.JS,
      };
  
      dispatch(storeWidget({ widgetId: selectedWidgetId, widgetData }));// Step 2: Dispatch storing the widget
    }, 500); 
  }
  useEffect(() => {
    console.log("Updated formData:", formData);
    console.log("Updated codeData:", codeData?.HTML,codeData?.CSS,codeData?.JS);
  }, [formData, codeData]); // Runs when Redux updates

  const getIframeContent = (htmlContent: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    ${htmlContent}
  </body>
  </html>
`;


  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "What is a design system?",
      children: (
        <p>
          A design system is a collection of reusable components, patterns, and
          guidelines that are assembled to build a consistent and user-friendly
          user interface for a product.
        </p>
      ),
    },
    {
      key: "2",
      label: "Why is a design system important?",
      children: (
        <p>
          A design system is a collection of reusable components, patterns, and
          guidelines that are assembled to build a consistent and user-friendly
          user interface for a product.
        </p>
      ),
    },
    {
      key: "3",
      label: "Are design systems only for large organizations?",
      children: (
        <p>
          No, design systems are beneficial for teams of all sizes, as they
          ensure consistency and efficiency.
        </p>
      ),
    },
    {
      key: "4",
      label: "How does it benefit a development team?",
      children: (
        <p>
          It reduces redundancy, encourages collaboration between designers and
          developers, and accelerates project timelines.
        </p>
      ),
    },
    {
      key: "5",
      label: "How do you implement a design system?",
      children: (
        <p>
          By defining reusable components, establishing guidelines, and ensuring
          adoption across all teams in the project.
        </p>
      ),
    },
  ];
  const tabsItems: TabsProps["items"] = [
    {
      key: "1",
      label: <img
      src={desktopIcon}
      alt="desktop Icon"
    />
    ,
      children: (
        <div className="right-sidebar-container">
        <div className="block-elements custom-collapse">
        <Collapse
        items={items}
        expandIconPosition="end"
        bordered={false}
        defaultActiveKey={["1"]}
        onChange={onChange}
        expandIcon={(panelProps) =>
          panelProps.isActive ? (
            <img src={minusIcon} alt="minus icon" />
          ) : (
            <img src={plusIcon} alt="plus icon" />
          )
        }
      />
      </div>
      </div>
      ),
    },
    {
      key: "2",
      label: <img
      src={tabIcon}
      alt="Tab Icon"
    />
    ,
      children: (
        <iframe
          title="Tab 2"
          srcDoc={getIframeContent(`
            <div class="right-sidebar-container">
              <div class="block-elements custom-collapse">
                <h3>Tab Content</h3>
                <p>This content is displayed inside an iframe for the second tab.</p>
              </div>
            </div>
          `)}
          style={{
            width: "70%",
            height: "1048px",
            border: "none",
            backgroundColor: "#f5f5f5",
          }}
        ></iframe>
      ),
    },
    {
      key: "3",
      label:<img
      src={mobileIcon}
      alt="Mobile Icon"
    />,
      children: (
        <iframe
          title="Tab 2"
          srcDoc={getIframeContent(`
            <div class="right-sidebar-container">
              <div class="block-elements custom-collapse">
                <h3>Tab Content</h3>
                <p>This content is displayed inside an iframe for the second tab.</p>
              </div>
            </div>
          `)}
          style={{
            width: "40%",
            height: "1048px",
            border: "none",
            backgroundColor: "#f5f5f5",
          }}
        ></iframe>
      ),
    },
  ];
  const operations = <div className="right-sidebar-extra-icons">
  <img src={infoIcon} alt="info icon" />
  <a href={selectedWidgetId && widgetDetails[selectedWidgetId]?.livePreview}><img src={previewIcon} alt="preview icon" /></a>
  
  <Button className="save-btn" type="primary" onClick={submitResponse}>Save Changes</Button>
</div>
  return (
    <div className="right-sidebar">
      <Tabs defaultActiveKey="1" items={tabsItems} onChange={onChange} tabBarExtraContent={operations}/>
    </div>
  );
};
export default RightSidebar;
