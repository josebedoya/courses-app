import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';

interface IState {
  isLoading: boolean;
  error: unknown | null;
  data: Array<object>;
}

interface IFormFields {
  title: string;
}

const initialState: IState = {
  isLoading: false,
  error: null,
  data: [],
};

export const fetchLanguages = createAsyncThunk(
  'languages/fetchLanguages',
  async () => {
    try {
      const response = await API.get('/languages');
      const languages = response.data.map((language: any) => ({
        ...language,
        key: language.id,
      }));
      return languages;
    } catch (err) {
      return err;
    }
  }
);

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLanguages.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchLanguages.fulfilled, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(fetchLanguages.rejected, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export default languagesSlice.reducer;
