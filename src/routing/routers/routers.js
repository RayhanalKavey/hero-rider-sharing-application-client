import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Login from "../../pages/authentication/Login/Login";
import Registration from "../../pages/authentication/Registration/Registration";
import Home from "../../pages/home/Home/Home";
import LearnerRegistration from "../../pages/riderOrLearnerRegistration/LearnerRegistration/LearnerRegistration";
import RiderOrLearnerSelection from "../../pages/riderOrLearnerRegistration/RiderOrLearnerSelection/RiderOrLearnerSelection";
import RiderRegistration from "../../pages/riderOrLearnerRegistration/RiderRegistration/RiderRegistration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/registration", element: <Registration /> },
      { path: "/selection", element: <RiderOrLearnerSelection /> },
      { path: "/rider-registration", element: <RiderRegistration /> },
      { path: "/learner-registration", element: <LearnerRegistration /> },
    ],
  },
]);
export default router;
