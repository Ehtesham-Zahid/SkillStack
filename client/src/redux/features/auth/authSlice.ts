import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  showOtpDialog: false,
  showAuthDialog: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
    setShowOtpDialog: (state, action) => {
      state.showOtpDialog = action.payload;
    },
    setShowAuthDialog: (state, action) => {
      state.showAuthDialog = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  setShowOtpDialog,
  setShowAuthDialog,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
