import { combineReducers } from '@reduxjs/toolkit';

import courseCategoriesReducer from '../containers/CoursesPages/CategoriesPage/courseCategoriesSlice';
import coursesReducer from '../containers/CoursesPages/CoursesPage/coursesSlice';
import courseTagsReducer from '../containers/CoursesPages/TagsPage/courseTagsSlice';
import languagesReducer from './../containers/Languages/languagesSlice';
import loginReducer from './../containers/LoginPage/loginSlice';
import notificationReducer from '../containers/Notifications/notificationSlice';

const rootReducer = combineReducers({
  auth: loginReducer,
  courseCategories: courseCategoriesReducer,
  courses: coursesReducer,
  courseTags: courseTagsReducer,
  languages: languagesReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
