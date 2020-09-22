import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import { API } from './../../api';
import setAuthToken from '../../utils/setAuthToken';

interface ILoginState {
  isRequesting: boolean;
  error: unknown | null;
  isAuthenticated: boolean;
  user: object | null;
}

const initialState: ILoginState = {
  isRequesting: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

interface IFormFields {
  email: string;
  password: string;
}

// First, create the thunk
export const loginRequest = createAsyncThunk(
  'login/loginRequest',
  async (data: IFormFields, { rejectWithValue }) => {
    try {
      const response = await API.post('/auth/signin', data);
      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      // set token to Auth header
      setAuthToken(accessToken);
      // decode token to get user data
      const decoded = jwt_decode(accessToken);
      const userData = {...(decoded as {}), ...response.data};
      return userData;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      const { payload } = action;
      state.isAuthenticated = true;
      state.user = payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem('token');
      setAuthToken(false);
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(loginRequest.pending, (state) => {
      state.isRequesting = true;
    });
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      const { payload } = action;
      state.isRequesting = false;
      state.isAuthenticated = true;
      state.user = payload;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      const { payload } = action;
      state.isRequesting = false;
      state.isAuthenticated = false;
      state.error = payload;
    });
  },
});

export const { setLoggedUser, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;

// export const loginRequest = (
//   email: string,
//   password: string,
// ): AppThunk => async dispatch => {
//   try {
//     dispatch(startLogin())
//   } catch (error) {}
// };
