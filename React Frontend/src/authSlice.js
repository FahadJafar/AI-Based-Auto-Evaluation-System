import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: true,
  username: '',
};


const storedAuthState = JSON.parse(localStorage.getItem('authState'));
if (storedAuthState) {
  initialState.isAuthenticated = storedAuthState.isAuthenticated;
  initialState.username = storedAuthState.username;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = '';
   
      localStorage.removeItem('authState');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
