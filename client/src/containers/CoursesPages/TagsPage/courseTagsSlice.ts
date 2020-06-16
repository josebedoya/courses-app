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

export const fetchTags = createAsyncThunk(
  'courseTags/fetchTags',
  async () => {
    try {
      const response = await API.get('/course-tags');
      const tags = response.data.map((tag: any) => ({
        ...tag,
        key: tag.id,
      }));
      return tags;
    } catch (err) {
      return err;
      // return rejectWithValue(err.response.data);
    }
  },
);

export const createTag = createAsyncThunk(
  'courseTags/createTag',
  async (data: IFormFields, { rejectWithValue }) => {
    try {
      const response = await API.post('/course-tags', data);
      response.data.key = response.data.id;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateTag = createAsyncThunk(
  'courseTags/updateTag',
  async (data: IFormFields, { rejectWithValue }) => {
    const { id, ...fields } = data;
    try {
      const response = await API.put(`/course-tags/${id}`, fields);
      response.data.key = response.data.id;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteTag = createAsyncThunk(
  'courseTags/deleteTag',
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete('/course-tags', { data: { id } });
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const courseTagsSlice = createSlice({
  name: 'courseTags',
  initialState,
  reducers: {
    getTagById(state, action) {
      const { payload } = action;
      const item: any = state.data.find((d: any) => d.id === payload);
      state.getById = { title: item.title };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTags.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.error = payload;
    });
    //
    builder.addCase(createTag.pending, state => {
      state.isSubmitting = true;
    });
    builder.addCase(createTag.fulfilled, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.isSaved = true;
      state.data = [...state.data, payload];
    });
    builder.addCase(createTag.rejected, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.error = payload;
    });
    //
    builder.addCase(updateTag.pending, state => {
      state.isSubmitting = true;
    });
    builder.addCase(updateTag.fulfilled, (state, action) => {
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
    builder.addCase(updateTag.rejected, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.error = payload;
    });
    //
    builder.addCase(deleteTag.pending, state => {
      state.isSubmitting = true;
    });
    builder.addCase(deleteTag.fulfilled, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.data = state.data.filter((item: any) => item.id !== payload);
    });
    builder.addCase(deleteTag.rejected, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.error = payload;
    });
  },
});

export const { getTagById } = courseTagsSlice.actions;

export default courseTagsSlice.reducer;
