import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  email: "",
  role: "",
  isLoading: true,
  isError: false,
  error: "",
  user: {},
};

// Firebase related functions are basically async function thats why I use async thunk here(with createAsyncThunk)
// Async thunk for Register the user
export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    const { displayName, emailVerified, photoUrl, uid } = data.user;
    const user = {
      displayName,
      userEmail: data.user.email,
      emailVerified,
      photoUrl,
      uid,
    };
    // We get this returned data in addCase's action.payload
    return user;
  }
);
// Async thunk for Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const { displayName, emailVerified, photoUrl, uid } = data.user;
    const user = {
      displayName,
      userEmail: data.user.email,
      emailVerified,
      photoUrl,
      uid,
    };
    return user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  // extra reducers for create user and login user. In extra reducer we got pending, fulfilled and rejected state. Action will be exported from createAsyncThunk.
  extraReducers: (builder) => {
    builder
      //Cases for create user (this values replace the initial state)
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.email = action.payload.userEmail;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.email = "";
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

// Export reducers will provide in the store
export default authSlice.reducer;
