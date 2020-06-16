import React from 'react';
import { Form, Col, Row, Input } from 'antd';

interface Props {
  onFinish: (data: object) => void;
  isFormEdit: boolean;
  formData: any | null;
}

const TagForm = ({ onFinish, isFormEdit, formData }: Props) => {
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
    </Form>
  );
};

export default TagForm;
