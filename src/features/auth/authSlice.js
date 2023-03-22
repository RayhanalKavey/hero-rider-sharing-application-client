import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
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
// Create async thunk for google login
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);

  const { displayName, emailVerified, photoUrl, uid } = data.user;
  const user = {
    displayName,
    userEmail: data.user.email,
    emailVerified,
    photoUrl,
    uid,
  };
  return user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  // Normal reducers for logout
  reducers: {
    logOut: (state, action) => {
      state.isLoading = false;
      state.email = "";
      // state.isError = false;
      // state.error = "";
      state.user = {};
    },
    setUser: (state, { payload }) => {
      state.isLoading = false;
      // state.isError = false;
      // state.error = "";
      state.email = payload.userEmail;
      state.user = payload;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },

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
      })
      //Cases for Login user (this values replace the initial state)
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.email = action.payload.userEmail;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.email = "";
        state.isError = true;
        state.error = action.error.message;
      })
      //Cases for Login user (this values replace the initial state)
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.email = action.payload.userEmail;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.email = "";
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

// Export actions for dispatch where needed
export const { logOut, setUser, toggleLoading } = authSlice.actions;

// Export reducers will provide in the store
export default authSlice.reducer;
