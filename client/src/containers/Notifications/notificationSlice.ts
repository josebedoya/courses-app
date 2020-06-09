import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INotificationState {
  type: string | null;
  message?: string | null;
  description?: string | null;
}

const initialState: INotificationState = {
  type: null,
  message: null,
  description: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<INotificationState>) => {
      const { type, message, description } = action.payload;
      state.type = type;
      state.message = message;
      state.description = description;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
