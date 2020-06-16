import { combineReducers } from '@reduxjs/toolkit';

import loginReducer from './../containers/LoginPage/loginSlice';
import courseCategoriesReducer from '../containers/CoursesPages/CategoriesPage/courseCategoriesSlice';
import courseTagsReducer from '../containers/CoursesPages/TagsPage/courseTagsSlice';
import notificationReducer from '../containers/Notifications/notificationSlice';

const rootReducer = combineReducers({
  notification: notificationReducer,
  auth: loginReducer,
  courseCategories: courseCategoriesReducer,
  courseTags: courseTagsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
