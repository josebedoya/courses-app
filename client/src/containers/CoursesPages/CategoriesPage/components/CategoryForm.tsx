import React from 'react';
import { Form, Col, Row, Input, Select } from 'antd';

const { Option } = Select;

interface Props {
  onFinish: (data: object) => void;
  isFormEdit: boolean;
  formData: any | null;
}

const CategoryForm = ({ onFinish, isFormEdit, formData }: Props) => {
  return (
    <Form layout='vertical' id='myForm' hideRequiredMark onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='title'
            label='Title'
            initialValue={isFormEdit ? formData.title : null}
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please enter a title',
              },
            ]}
          >
            <Input placeholder='Please enter a title' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='type'
            label='Type'
            initialValue={isFormEdit && formData.type}
            rules={[{ required: true, message: 'Please choose the type' }]}
          >
            <Select placeholder='Please choose the type'>
              <Option value='Programming Language'>Programming Language</Option>
              <Option value='Softskill'>Softskill</Option>
              <Option value='Framework'>Framework</Option>
              <Option value='Library'>Library</Option>
              <Option value='DevOps'>DevOps</Option>
              <Option value='Testing'>Testing</Option>
              <Option value='Security'>Security</Option>
              <Option value='Version Control'>Version Control</Option>
              <Option value='Platforms'>Platforms</Option>
              <Option value='Other'>Other</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CategoryForm;
