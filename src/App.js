import logo from "./logo.svg";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { RouterProvider } from "react-router-dom";
import router from "./routing/routers/routers";
import { setUser, toggleLoading } from "./features/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.config";
import { useEffect } from "react";

function App() {
  // For checking if the firebase configured properly
  // console.log(process.env);
  // console.log(document.documentElement);
  const dispatch = useDispatch();
  // OnAuthChang .// we have to do this task where the application load in every change. App.js is the place which is loaded every time when anything change
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, emailVerified, photoUrl, uid } = user;
        const userInfo = {
          displayName,
          userEmail: user.email,
          emailVerified,
          photoUrl,
          uid,
        };
        console.log("Logged in user from onAuthStateChange", userInfo);
        dispatch(setUser(userInfo));
      } else {
        dispatch(toggleLoading());
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
