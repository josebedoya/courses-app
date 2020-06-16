import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API } from './../../api';

interface IUserState {
  isLoading: boolean;
  error: unknown | null;
  data: object;
}

const initialState: IUserState = {
  isLoading: false,
  error: null,
  data: {},
};

// interface IFormFields {
//   id: number;
// }

// First, create the thunk
export const fetchLoggedUser = createAsyncThunk(
  'login/fetchLoggedUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/users/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLoggedUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLoggedUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchLoggedUser.rejected, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export default userSlice.reducer;
