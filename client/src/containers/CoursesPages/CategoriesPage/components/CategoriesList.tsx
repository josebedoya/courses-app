import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
  data: Array<object>;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const CategoriesList = ({ data, handleEdit, handleDelete }: Props) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: any, b: any) => a.title < b.title ? -1 : (a.title > b.title ? 1 : 0)
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a: any, b: any) => a.type < b.type ? -1 : (a.type > b.type ? 1 : 0)
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

export default CategoriesList
