import { createSlice } from '@reduxjs/toolkit';

// Initialize state
const initialState = {
  name: undefined,
  email: undefined,
  token: undefined,
  role: undefined,
  timestamp: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.timestamp = new Date().getTime();
    },
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.timestamp = action.payload.timestamp;
    },
    setName: (state, action) => {
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.name = undefined;
      state.email = undefined;
      state.token = undefined;
      state.role = undefined;
      state.timestamp = undefined;
    },
  },
});

export const { login, setUser, setName, clearUser } = userSlice.actions;

export default userSlice.reducer;
