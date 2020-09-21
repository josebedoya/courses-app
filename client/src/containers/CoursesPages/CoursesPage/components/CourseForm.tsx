import React from 'react';
import { Form, Col, Row, Input, Select } from 'antd';

const { Option } = Select;

interface Props {
  onFinish: (data: object) => void;
  isFormEdit: boolean;
  formData: any | null;
}

const CourseForm = ({ onFinish, isFormEdit, formData }: Props) => {
  const linkSelectBefore = (
    <Select defaultValue="http://" className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

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
            name='link'
            label='Website'
            initialValue={isFormEdit ? formData.title : null}
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please enter a title',
              },
            ]}
          >
            <Input addonBefore={linkSelectBefore} placeholder='Please enter a title' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='courseCategoryId'
            label='Category'
            initialValue={isFormEdit && formData.courseCategoryId}
            rules={[{ required: true, message: 'Please choose the category' }]}
          >
            <Select placeholder='Please choose the category'>
              <Option value='1'>Cat 1</Option>
              <Option value='2'>Cat 2</Option>
              <Option value='3'>Cat 3</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='languageId'
            label='Language'
            initialValue={isFormEdit && formData.languageId}
            rules={[{ required: true, message: 'Please choose the language' }]}
          >
            <Select placeholder='Please choose the language'>
              <Option value='1'>English</Option>
              <Option value='2'>Spanish</Option>
              <Option value='3'>French</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CourseForm;
