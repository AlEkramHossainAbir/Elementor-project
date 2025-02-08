import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Card, Button, Row, Col, Switch, Typography, Modal, Form, Input, Select, Flex } from "antd";
import { RootState,AppDispatch} from "../../redux/store";
import { addWidget, fetchWidgetDetails, fetchWidgets, toggleWidgetStatus } from "../../redux/widgetApiSlice";
import { openModal } from "../../redux/widgetModalSlice";
import "./style.css"
import editIcon from "./../../assets/svgs/edit-pen.svg";
import settingIcon from "./../../assets/svgs/setting-wheel.svg";
import bucketIcon from "./../../assets/svgs/bucket.svg";
import dragDropIcon from "./../../assets/svgs/drag&drop.svg";

import { addCollapseItem } from "../../redux/controllerSlice";

const { Title } = Typography;
const { TextArea } = Input;

const WidgetList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { widgets, status } = useSelector((state: RootState) => state.widgets);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchWidgets());
  }, [dispatch]);

  const handleToggle = (id: number, currentStatus: boolean) => {
    const newState = !currentStatus;
    dispatch(toggleWidgetStatus({ widgetId: id, isActive: newState }));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(addWidget(values))
        .then(response=> openDetailsModal(response.payload.id))
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openDetailsModal = (widgetId: number) => {
    if (widgetId) {
      dispatch(fetchWidgetDetails(widgetId))
      .then(response=> {
        const controls = response.payload?.details?.controls || {};

        // Convert controls object into an array of newCollapseItem objects
        const newCollapseItems = Object.values(controls).map(({ dataKey, controlName, tabId }) => {
          console.log(dataKey, controlName, tabId)
          return ({
            key: dataKey,       // Use dataKey as key
            label: <Flex gap={10}>
            <img src={dragDropIcon} alt="drag and drop icon" className="draggable-icon" />
            {controlName}
            </Flex>, // Use controlName as label
            children: "SDKFJSDJKFH",
            tabKey: tabId,
          })
        });

        
        newCollapseItems.forEach(({tabKey,...newItem}) => {
          console.log("newItem",newItem)
          dispatch(
            addCollapseItem({
              tabKey: tabKey,
              newItem, // Dispatch individual object
            })
          );
        });
      })
    }
    dispatch(openModal(widgetId));
  };


  return (
    <div style={{ padding: "20px", margin: "auto" }}>
      <Title level={3}>Widget List</Title>
      <Row gutter={[16, 16]}>
        {/* Create New Button */}
        <Col span={6}>
          <Card className="create-new-btn" style={{ textAlign: "center", height: "100%", cursor:'pointer' }} onClick={showModal}>
            Create New
          </Card>
        </Col>

        {/* Widget Cards */}
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          widgets.map((widget) => (
            <Col key={widget.id} span={6}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="linkable-text"
                  onClick={() => openDetailsModal(widget.id)}>{widget.title}</span>
                  <Switch
                   checked={widget.isActive}
                   onChange={() => handleToggle(widget.id, widget.isActive)}
                  />
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Modal 
       title="Create New" 
       open={isModalOpen}
       onOk={handleOk} 
       getContainer={()=>document.body} 
       onCancel={handleCancel}
       footer={null}
       >
        <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          label="Icon"
          name="icon"
          rules={[{ required: true, message: "Please select an icon" }]}
        >
          <Select placeholder="Select an icon" options={[
            { label: <img src={editIcon} alt="edit icon" />, value: "edit Icon" },
            { label: <img src={settingIcon} alt="edit icon" />, value: "Settings Icon" },
            { label: <img src={bucketIcon} alt="edit icon" />, value: "Bucket Icon" },
          ]} />
          
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <TextArea placeholder="Enter description" rows={3} />
        </Form.Item>

        <Button type="primary" block onClick={handleOk}>
          Continue
        </Button>
      </Form>
      </Modal>
    </div>
  );
};

export default WidgetList;
