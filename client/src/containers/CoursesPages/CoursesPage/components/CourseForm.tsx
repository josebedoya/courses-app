import React from 'react';
import { Form, Col, Row, Input, Select } from 'antd';

const { Option } = Select;

interface Props {
  onFinish: (data: object) => void;
  isFormEdit: boolean;
  formData: any | null;
  categories: any | null;
  languages: any | null;
}

const CourseForm = ({ onFinish, isFormEdit, formData, categories, languages }: Props) => {
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
            initialValue={isFormEdit ? formData.link : null}
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please enter the URL',
              },
            ]}
          >
            <Input placeholder='Please enter the URL' />
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
              {categories.map((item: any) => <Option key={item.id} value={item.id}>{item.title}</Option>)}
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
              {languages.map((item: any) => <Option key={item.id} value={item.id}>{item.title}</Option>)}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CourseForm;
