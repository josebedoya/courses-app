import { combineReducers } from '@reduxjs/toolkit';

import loginReducer from './../containers/LoginPage/loginSlice';
import courseCategoriesReducer from '../containers/CoursesPages/CategoriesPage/courseCategoriesSlice';
import courseTagsReducer from '../containers/CoursesPages/TagsPage/courseTagsSlice';
import coursesReducer from '../containers/CoursesPages/CoursesPage/coursesSlice';
import notificationReducer from '../containers/Notifications/notificationSlice';

const rootReducer = combineReducers({
  notification: notificationReducer,
  auth: loginReducer,
  courseCategories: courseCategoriesReducer,
  courseTags: courseTagsReducer,
  courses: coursesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
