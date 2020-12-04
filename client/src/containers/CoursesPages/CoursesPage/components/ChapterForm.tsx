import React from 'react';
import { Form, Col, Row, Input, TimePicker } from 'antd';
// import moment from 'moment';
// const format = 'HH:mm';

interface Props {
  onFinish: (data: object) => void;
  isFormEdit: boolean;
  formData: any | null;
}

const ChapterForm = ({ onFinish, isFormEdit, formData }: Props) => {
  return (
    <Form layout='vertical' id='chapterForm' hideRequiredMark onFinish={onFinish}>
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
          {/* <Form.Item
            name='duration'
            label='Duration'
            initialValue={isFormEdit ? formData.duration : moment('00:05', format)}
          >
            <TimePicker format={format} onChange={onChange} />
          </Form.Item> */}
          <Form.Item
            name='duration'
            label='Duration'
            help='HH:mm'
            initialValue={isFormEdit ? formData.duration : '00:00'}
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please enter a duration',
              },
            ]}
          >
            <Input placeholder='Please enter a duration' />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ChapterForm;