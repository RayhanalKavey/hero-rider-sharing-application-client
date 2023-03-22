import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleLogin, loginUser } from "../../../features/auth/authSlice";

const Login = () => {
  //------ Take isError , Errors from useSelector of REDUX
  const { isError, error, isLoading, email } = useSelector(
    (state) => state?.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //------- React hook form user form and error
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //------- From data will come up here....
  const handleOnSubmit = (data) => {
    const { email, password } = data;
    dispatch(loginUser({ email, password }));
  };

  // If loading false and email arrived then redirect user
  useEffect(() => {
    if (!isLoading && email) {
      //Navigate user to the desired path (It basically works when user forcefully send to the login page. when user login/register the he will redirect to the page from where user if forced)
      // navigate(from, { replace: true });
      navigate("/");
      reset();
    }
  }, [isLoading, email, reset]);
  // Shoe error message with toast if failed to login
  useEffect(() => {
    if (isError) {
      toast.error(error, { id: "login" });
    }
  }, [isError, error]);

  return (
    <div className="flex items-center justify-center mx-5 my-12">
      <div className="w-96 bg-gray-300 p-10 shadow-xl rounded-tr-50 rounded-bl-50">
        <h1 className="text-3xl mb-5 text-center">Login</h1>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="form-control w-full max-w-xs">
            {/* -----Email--- */}
            <label className="block mb-1 font-bold text-gray-500">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email address is required !",
              })}
              className="w-full px-4 py-2 mb-4 leading-tight border border-gray-500 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Your email"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email?.message}</p>
            )}
            {/* ----Password--- */}
            <label className="block mb-1 font-bold text-gray-500">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required !",
              })}
              className="w-full px-4 py-2 mb-4 leading-tight border border-gray-500 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="*********"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password?.message}</p>
            )}
          </div>
          {/* ----Submit button----  */}
          <input
            className="w-full px-4 py-2 mt-5 mb-1 text-white bg-blue-500 rounded cursor-pointer"
            type="submit"
            value="Sign Up"
          />
          {/* {isError && (
            <label className="block mt-2 text-sm font-bold text-red-600">
              {error}
            </label>
          )} */}
        </form>
        {/* ---Link to the login page--- */}
        <p className="text-center">
          Not registered yet?{" "}
          <Link className="text-blue-500" to={"/selection"}>
            Registration
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
