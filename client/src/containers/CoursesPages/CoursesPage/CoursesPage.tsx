import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Drawer, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { RootState } from './../../../app/rootReducer';
import {
  fetchCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from './coursesSlice';

import { fetchCategories } from '../CategoriesPage/courseCategoriesSlice';

import HeadingPage from '../../../components/Common/HeadingPage';
import CoursesList from './components/CoursesList';
import CourseForm from './components/CourseForm';
import { showNotification } from '../../../utils/notifications';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [getId, setGetId] = useState<number | null>(null);
  const [drawerTitle, setDrawerTitle] = useState<string>('Create a new course');
  const { isSaved, data, getById } = useSelector(
    (state: RootState) => state.courses,
  );
  const { data: categories } = useSelector((state: RootState) => state.courseCategories);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isSaved) setShowDrawer(false);
  }, [isSaved]);

  const onFinish = async (values: any) => {
    const { title, type } = values;
    if (isFormEdit) {
      const response: any = await dispatch(updateCourse({ title, type, id: getId }));
      if (updateCourse.fulfilled.match(response)) {
        showNotification(
          'success',
          'Course updated',
          'Course was updated successfully',
        );
        setShowDrawer(false);
      }
    } else {
      const response: any = await dispatch(createCourse({ title, type }));
      if (createCourse.fulfilled.match(response)) {
        showNotification(
          'success',
          'Course created',
          'Course was created successfully',
        );
        setShowDrawer(false);
      }
    }
  };

  const handleDelete = async (id: number) => {
    const response: any = await dispatch(deleteCourse(id));
    if (deleteCourse.fulfilled.match(response)) {
      showNotification(
        'success',
        'Course deleted',
        'Course was deleted successfully',
      );
    }
  };

  const handleBtnAdd = () => {
    setDrawerTitle('Create a new course');
    setShowDrawer(true);
    setIsFormEdit(false);
  };

  const handleEdit = (id: number) => {
    dispatch(getCourseById(id));
    setGetId(id);
    setDrawerTitle('Update course');
    setShowDrawer(true);
    setIsFormEdit(true);
  };

  return (
    <>
      <HeadingPage title='Courses' />
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
              New course
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
            <CourseForm
              onFinish={onFinish}
              isFormEdit={isFormEdit}
              formData={getById}
              categories={categories}
            />
          </Drawer>
          <CoursesList
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default CoursesPage;
