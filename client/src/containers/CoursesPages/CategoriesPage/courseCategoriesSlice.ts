import { notification } from 'antd';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../api';

interface IState {
  isLoading: boolean;
  isSaving: boolean;
  isSaved: boolean;
  error: unknown | null;
  data: Array<object>;
}

interface IFormFields {
  title: string;
  type: string;
}

const initialState: IState = {
  isLoading: false,
  isSaving: false,
  isSaved: false,
  error: null,
  data: [],
};

export const fetchCategories = createAsyncThunk(
  'courseCategories/fetchCategories',
  async () => {
    try {
      const response = await API.get('/course-categories');
      const categories = response.data.map((category: any) => ({
        ...category,
        key: category.id,
      }));
      return categories;
    } catch (err) {
      return err;
      // return rejectWithValue(err.response.data);
    }
  },
);

export const createCategory = createAsyncThunk(
  'courseCategories/createCategory',
  async (data: IFormFields, { rejectWithValue }) => {
    try {
      const response = await API.post('/course-categories', data);
      response.data.key = response.data.id;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'courseCategories/deleteCategory',
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete('/course-categories', { data: { id } });
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const courseCategoriesSlice = createSlice({
  name: 'courseCategories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.error = payload;
    });
    //
    builder.addCase(createCategory.pending, state => {
      state.isSaving = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      const { payload } = action;
      state.isSaving = false;
      state.isSaved = true;
      state.data = [...state.data, payload];
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      const { payload } = action;
      state.isSaving = false;
      state.error = payload;
    });
    //
    builder.addCase(deleteCategory.pending, state => {
      state.isSaving = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isSaving = false;
      state.data = state.data.filter((item: any) => item.id !== payload);
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      const { payload } = action;
      state.isSaving = false;
      state.error = payload;
    });
  },
});

export default courseCategoriesSlice.reducer;
