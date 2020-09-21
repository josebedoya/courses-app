import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IState {
  isLoading: boolean;
  isSubmitting: boolean;
  isSaved: boolean;
  error: unknown | null;
  data: Array<object>;
  getById: object | null;
}

interface IFormFields {
  title: string;
  type: string;
  id?: number | null;
}

const initialState: IState = {
  isLoading: false,
  isSubmitting: false,
  isSaved: false,
  error: null,
  data: [],
  getById: null,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    try {
      const response = await API.get('/courses');
      const courses = response.data.map((course: any) => ({
        ...course,
        key: course.id,
      }));
      return courses;
    } catch (err) {
      return err;
      // return rejectWithValue(err.response.data);
    }
  },
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (data: IFormFields, { rejectWithValue }) => {
    try {
      const response = await API.post('/courses', data);
      response.data.key = response.data.id;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async (data: IFormFields, { rejectWithValue }) => {
    const { id, ...fields } = data;
    try {
      const response = await API.put(`/courses/${id}`, fields);
      response.data.key = response.data.id;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete('/courses', { data: { id } });
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    getCourseById(state, action) {
      const { payload } = action;
      const item: any = state.data.find((d: any) => d.id === payload);
      state.getById = { title: item.title, link: item.link };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCourses.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.error = payload;
    });
    //
    builder.addCase(createCourse.pending, state => {
      state.isSubmitting = true;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.isSaved = true;
      state.data = [...state.data, payload];
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.error = payload;
    });
    //
    builder.addCase(updateCourse.pending, state => {
      state.isSubmitting = true;
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      const updateData = state.data.reduce((acc: any, newData: any) => {
        if (newData.id === payload.id) {
          return [...acc, payload];
        } else {
          return [...acc, newData];
        }
      }, []);
      state.data = updateData as [];
    });
    builder.addCase(updateCourse.rejected, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.error = payload;
    });
    //
    builder.addCase(deleteCourse.pending, state => {
      state.isSubmitting = true;
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.data = state.data.filter((item: any) => item.id !== payload);
    });
    builder.addCase(deleteCourse.rejected, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.error = payload;
    });
  },
});

export const { getCourseById } = coursesSlice.actions;

export default coursesSlice.reducer;
