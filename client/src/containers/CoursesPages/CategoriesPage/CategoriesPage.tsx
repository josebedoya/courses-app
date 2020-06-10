import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Drawer, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { RootState } from './../../../app/rootReducer';
import {
  fetchCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from './courseCategoriesSlice';
import HeadingPage from '../../../components/Common/HeadingPage';
import CategoriesList from './components/CategoriesList';
import CategoryForm from './components/CategoryForm';
import { showNotification } from '../../../utils/notifications';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [getId, setGetId] = useState<number | null>(null);
  const [drawerTitle, setDrawerTitle] = useState<string>('Create a new category');
  const { isSaved, data, getById } = useSelector(
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
    if (isFormEdit) {
      const response: any = await dispatch(updateCategory({ title, type, id: getId }));
      if (updateCategory.fulfilled.match(response)) {
        showNotification(
          'success',
          'Category updated',
          'Category was updated successfully',
        );
        setShowDrawer(false);
      }
    } else {
      const response: any = await dispatch(createCategory({ title, type }));
      if (createCategory.fulfilled.match(response)) {
        showNotification(
          'success',
          'Category created',
          'Category was created successfully',
        );
        setShowDrawer(false);
      }
    }
  };

  const handleDelete = async (id: number) => {
    const response: any = await dispatch(deleteCategory(id));
    if (deleteCategory.fulfilled.match(response)) {
      showNotification(
        'success',
        'Category deleted',
        'Category was deleted successfully',
      );
    }
  };

  const handleBtnAdd = () => {
    setDrawerTitle('Create a new category');
    setShowDrawer(true);
    setIsFormEdit(false);
  };

  const handleEdit = (id: number) => {
    dispatch(getCategoryById(id));
    setGetId(id);
    setDrawerTitle('Update category');
    setShowDrawer(true);
    setIsFormEdit(true);
  };

  return (
    <>
      <HeadingPage title='Categories' />
      <div className='card'>
        <div className='card__body'>
          <Button
            type='primary'
            size='large'
            ghost
            onClick={handleBtnAdd}
            icon={<PlusOutlined />}
          >
            New category
          </Button>
          <Drawer
            title={drawerTitle}
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
            <CategoryForm
              onFinish={onFinish}
              isFormEdit={isFormEdit}
              formData={getById}
            />
          </Drawer>
          <CategoriesList
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
