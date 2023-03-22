import { createBrowserRouter } from "react-router-dom";
import AdminDashBoard from "../../layout/AdminDashBoard/AdminDashBoard";
import Main from "../../layout/Main/Main";
import RiderDashboard from "../../layout/RiderDashboard/RiderDashboard";
import AllUser from "../../pages/adminFeature/AllUser/AllUser";
import Login from "../../pages/authentication/Login/Login";
import Registration from "../../pages/authentication/Registration/Registration";
import Home from "../../pages/home/Home/Home";
import RiderProfile from "../../pages/riderFeature/RiderProfile/RiderProfile";
import LearnerRegistration from "../../pages/riderOrLearnerRegistration/LearnerRegistration/LearnerRegistration";
import RiderOrLearnerSelection from "../../pages/riderOrLearnerRegistration/RiderOrLearnerSelection/RiderOrLearnerSelection";
import RiderRegistration from "../../pages/riderOrLearnerRegistration/RiderRegistration/RiderRegistration";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RiderRoute from "../RiderRoute/RiderRoute";

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
  {
    path: "/admin-dashboard",

    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminDashBoard />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [{ path: "/admin-dashboard", element: <AllUser /> }],
  },
  {
    path: "/rider-dashboard",

    element: (
      <PrivateRoute>
        <RiderRoute>
          <RiderDashboard />
        </RiderRoute>
      </PrivateRoute>
    ),
    children: [{ path: "/rider-dashboard", element: <RiderProfile /> }],
  },
]);
export default router;
