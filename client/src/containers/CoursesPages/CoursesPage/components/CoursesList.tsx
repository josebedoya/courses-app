import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
  data: Array<object>;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const CoursesList = ({ data, handleEdit, handleDelete }: Props) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: any, b: any) => a.title < b.title ? -1 : (a.title > b.title ? 1 : 0)
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      sorter: (a: any, b: any) => a.link < b.link ? -1 : (a.link > b.link ? 1 : 0)
    },
    {
      title: 'Category',
      dataIndex: ['courseCategory', 'title'],
      key: 'category',
      sorter: (a: any, b: any) => a.courseCategory.title < b.courseCategory.title ? -1 : (a.courseCategory.title > b.courseCategory.title ? 1 : 0)
    },
    {
      title: 'Language',
      dataIndex: ['language', 'title'],
      key: 'language',
      sorter: (a: any, b: any) => a.language.title < b.language.title ? -1 : (a.language.title > b.language.title ? 1 : 0)
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (text: string, record: any) => (
        <span>
          <EditOutlined onClick={() => handleEdit(record.key)} />
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <DeleteOutlined />
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default CoursesList
