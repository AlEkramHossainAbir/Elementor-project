import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Card, Button, Row, Col, Switch, Typography, Modal, Form, Input, Select } from "antd";
import { RootState,AppDispatch} from "../../redux/store";
import { addWidget, fetchWidgetDetails, fetchWidgets, toggleWidgetStatus } from "../../redux/widgetSlice";

const { Title } = Typography;
const { TextArea } = Input;

const WidgetList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { widgets, status, widgetDetails } = useSelector((state: RootState) => state.widgets);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchWidgets());
  }, [dispatch]);

  const handleToggle = (id: number, currentStatus: boolean) => {
    const newState = !currentStatus;
    console.log(newState)
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
        console.log(values)
        dispatch(addWidget(values))
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
    console.log(widgetId)
    // setSelectedWidgetId(widgetId);
    dispatch(fetchWidgetDetails(widgetId));
  };
  useEffect(()=>{
    console.log(widgetDetails)
  },[widgetDetails])

  return (
    <div style={{ padding: "20px", margin: "auto" }}>
      <Title level={3}>Widget List</Title>
      <Row gutter={[16, 16]}>
        {/* Create New Button */}
        <Col span={6}>
          <Card style={{ textAlign: "center", height: "100%", cursor:'pointer' }} onClick={showModal}>
            Create New
          </Card>
        </Col>

        {/* Widget Cards */}
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          widgets.map((widget) => (
            <Col key={widget.id} span={6} onClick={() => openDetailsModal(widget.id)}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{widget.title}</span>
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
            { label: "Icon 1", value: "icon1" },
            { label: "Icon 2", value: "icon2" },
            { label: "Icon 3", value: "icon3" },
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
