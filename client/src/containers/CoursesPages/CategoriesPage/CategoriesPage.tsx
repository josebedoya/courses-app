import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Drawer, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { RootState } from './../../../app/rootReducer';
import { fetchCategories, createCategory, deleteCategory } from './courseCategoriesSlice';
import HeadingPage from '../../../components/Common/HeadingPage';
import CategoriesList from './components/CategoriesList';
import CategoryForm from './components/CategoryForm';
import { showNotification } from '../../../utils/notifications';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const { isSaved, data } = useSelector(
    (state: RootState) => state.courseCategories,
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (isSaved) setShowDrawer(false);
  }, [isSaved]);

  const onFinish = async (values: any) => {
    const { title, type } = values;
    const response: any = await dispatch(createCategory({title, type}));
    if (createCategory.fulfilled.match(response)) {
      showNotification('success', 'Category created', 'Category was created successfully');
      setShowDrawer(false);
    }
  };

  const handleDelete = async (id: number) => {
    const response: any = await dispatch(deleteCategory(id));
    if (deleteCategory.fulfilled.match(response)) {
      showNotification('success', 'Category deleted', 'Category was deleted successfully');
    }
  }

  return (
    <>
      <HeadingPage title='Categories' />
      <div className='card'>
        <div className='card__body'>
          <Button type="primary" size="large" ghost onClick={() => setShowDrawer(true)} icon={<PlusOutlined />}>
            New category
          </Button>
          <Drawer
            title='Create a new category'
            width={400}
            onClose={() => setShowDrawer(false)}
            destroyOnClose={true}
            maskClosable={false}
            visible={showDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button
                  onClick={() => setShowDrawer(false)}
                  style={{ marginRight: 8 }}
                >
                  Cancel
                </Button>
                <Button
                  type='primary'
                  htmlType='submit'
                  form='myForm'
                  key='submit'
                >
                  Submit
                </Button>
              </div>
            }
          >
            <CategoryForm onFinish={onFinish} />
          </Drawer>
          <CategoriesList data={data} handleDelete={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
