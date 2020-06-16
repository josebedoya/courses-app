import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Drawer, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { RootState } from './../../../app/rootReducer';
import {
  fetchTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from './courseTagsSlice';
import HeadingPage from '../../../components/Common/HeadingPage';
import TagsList from './components/TagsList';
import TagForm from './components/TagForm';
import { showNotification } from '../../../utils/notifications';

const TagsPage = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [getId, setGetId] = useState<number | null>(null);
  const [drawerTitle, setDrawerTitle] = useState<string>('Create a new tag');
  const { isSaved, data, getById } = useSelector(
    (state: RootState) => state.courseTags,
  );

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  useEffect(() => {
    if (isSaved) setShowDrawer(false);
  }, [isSaved]);

  const onFinish = async (values: any) => {
    const { title } = values;
    if (isFormEdit) {
      const response: any = await dispatch(updateTag({ title, id: getId }));
      if (updateTag.fulfilled.match(response)) {
        showNotification(
          'success',
          'Tag updated',
          'Tag was updated successfully',
        );
        setShowDrawer(false);
      }
    } else {
      const response: any = await dispatch(createTag({ title }));
      if (createTag.fulfilled.match(response)) {
        showNotification(
          'success',
          'Tag created',
          'Tag was created successfully',
        );
        setShowDrawer(false);
      }
    }
  };

  const handleDelete = async (id: number) => {
    const response: any = await dispatch(deleteTag(id));
    if (deleteTag.fulfilled.match(response)) {
      showNotification(
        'success',
        'Tag deleted',
        'Tag was deleted successfully',
      );
    }
  };

  const handleBtnAdd = () => {
    setDrawerTitle('Create a new tag');
    setShowDrawer(true);
    setIsFormEdit(false);
  };

  const handleEdit = (id: number) => {
    dispatch(getTagById(id));
    setGetId(id);
    setDrawerTitle('Update tag');
    setShowDrawer(true);
    setIsFormEdit(true);
  };

  return (
    <>
      <HeadingPage title='Tags' />
      <div className='card'>
        <div className='card__body'>
          <div className="actions-top">
            <Button
              type='primary'
              size='large'
              ghost
              onClick={handleBtnAdd}
              icon={<PlusOutlined />}
            >
              New tag
            </Button>
          </div>
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
            <TagForm
              onFinish={onFinish}
              isFormEdit={isFormEdit}
              formData={getById}
            />
          </Drawer>
          <TagsList
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default TagsPage;
