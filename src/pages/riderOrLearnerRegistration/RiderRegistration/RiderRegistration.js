import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useRegisterRiderMutation } from "../../../features/auth/authApi";
import { createUser } from "../../../features/auth/authSlice";

const RiderRegistration = () => {
  // This state is used for password confirmation
  const [disabled, setDisabled] = useState(true);

  // Redirect user where from they comes to login
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //------ Take isError , Errors from useSelector of REDUX
  const { isError, error, isLoading, email } = useSelector(
    (state) => state?.auth
  );
  const dispatch = useDispatch();

  // React hook form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  //------- Check for confirm password
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  // Post user to the database and handle its updating state
  const [registerRider, riderUpdateStates] = useRegisterRiderMutation();

  //------- From data will come up here....
  const handleOnSubmit = (data) => {
    const { email, password } = data;
    const riderInfo = { ...data, isRider: true };
    dispatch(createUser({ email, password }));
    registerRider(riderInfo);
  };

  useEffect(() => {
    if (!isLoading && email && riderUpdateStates.isSuccess) {
      //Navigate user to the desired path (It basically works when user forcefully send to the login page. when user login/register the he will redirect to the page from where user if forced)
      navigate(from, { replace: true });
      // navigate("/");
      reset();
    }
  }, [isLoading, email, navigate, reset, from, riderUpdateStates.isSuccess]);

  // If failed to register then error message
  useEffect(() => {
    if (isError) {
      toast.error(error, { id: "registration" });
    }
  }, [isError, error]);
  const companyCategories = [
    "Technology",
    "Finance",
    "Healthcare",
    "Retail",
    "Manufacturing",
  ];

  const employeeCounts = ["1-50", "51-100", "101-500", "501-1000", "1000+"];
  return (
    <div className=" min-h-screen">
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="relative max-w-xl mx-auto mt-20 bg-gray-300 p-16  shadow-xl rounded-tr-[50px] rounded-bl-[50px] "
      >
        <Link to={"/selection"}>
          <div className="duration-500  absolute -top-9 -left-9 bg-gray-600 text-white hover:text-gray-600  shadow-xl rounded-tr-[15px] rounded-bl-[15px] p-6 hover:bg-gray-300 transform hover:-translate-y-1 hover:scale-105 transition-all  px-10">
            <h2 className="text-3xl font-bold flex justify-center h-full items-center">
              Go back
            </h2>
          </div>
        </Link>
        <h1 className="text-gray-800 text-3xl text-center mb-5 text-semibold">
          {" "}
          Employer Information
        </h1>
        {/* Full Name */}

        <div>
          <label htmlFor="fullName" className="block mb-1 font-medium">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: true })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        {/* Gender */}
        <div className="mt-4">
          <label className="block mb-1 font-medium">Gender:</label>
          <div>
            <label htmlFor="male" className="inline-flex items-center mr-4">
              <input
                type="radio"
                id="male"
                {...register("gender", { required: true })}
                value="male"
                className="mr-2"
              />
              Male
            </label>
            <label htmlFor="female" className="inline-flex items-center mr-4">
              <input
                type="radio"
                id="female"
                {...register("gender", { required: true })}
                value="female"
                className="mr-2"
              />
              Female
            </label>
            <label htmlFor="other" className="inline-flex items-center mr-4">
              <input
                type="radio"
                id="other"
                {...register("gender", { required: true })}
                value="other"
                className="mr-2"
              />
              Other
            </label>
          </div>
          {errors.gender && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
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
        {/* ///  company name*/}
        <div className="mt-4">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            {...register("companyName", { required: true })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.companyName && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        {/* Company Category */}
        <div className="mt-4">
          <label htmlFor="companyCategory">Company Category:</label>
          <select
            id="companyCategory"
            {...register("companyCategory")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {companyCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* Role in the Company */}
        <div className="mt-4">
          <label htmlFor="roleInCompany">Role in Company:</label>
          <input
            type="text"
            id="roleInCompany"
            {...register("roleInCompany", { required: true })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.roleInCompany && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        {/* Number of employees */}
        <div className="mt-4">
          <label htmlFor="employeeCount">Number of Employees:</label>
          <select
            id="employeeCount"
            {...register("employeeCount")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {employeeCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>
        {/* ----Password--- */}
        <div className="mt-4">
          <label className="block mb-1 font-bold text-gray-500">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required !",
              minLength: {
                value: 6,
                message: "Password must be 6 character.",
              },
            })}
            className="w-full px-4 py-2 mb-4 leading-tight border border-gray-500 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="*********"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password?.message}</p>
          )}
        </div>
        {/* ----Confirm Password---- */}
        <div className="mt-4">
          <label className="block mb-1 font-bold text-gray-500">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Password confirmation is required !",
            })}
            className="w-full px-4 py-2 mb-4 leading-tight border border-gray-500 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="*********"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-md mt-4" disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RiderRegistration;
