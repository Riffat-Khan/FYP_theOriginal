import { Link, Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useParams, useNavigate } from "react-router-dom";

import useRegister from "../../hooks/useRegister";

function Register() {
  const { type } = useParams();
  const navigate = useNavigate();
  if (type !== "user" && type !== "care") {
    return <Navigate to={"/"} />;
  }

  const apiRoute = type === "care" ? "/register" : "/signup";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      age: "",
    },
  });

  const password = watch("password");

  const { loading, register: handleRegister, error } = useRegister();

  const handleData = (data) => {
    handleRegister(data, apiRoute);
  };
  return (
    <div className="relative flex flex-col items-center justify-center pt-12 overflow-hidden">
      <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Register
        </h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 text-center py-2">{error}</p>}
        <form onSubmit={handleSubmit(handleData)} className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full input input-bordered"
              {...register("fullname", { required: "Full Name is required" })}
            />
            {errors.fullname && (
              <p className="text-red-500 text-start py-2">
                {errors.fullname.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-start py-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-start py-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-start py-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Gender</span>
            </label>
            <select
              className="w-full input input-bordered"
              {...register("gender", { required: "Select the Gender" })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-start py-2">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Age</span>
            </label>
            <input
              type="number"
              placeholder="Enter Age"
              className="w-full input input-bordered"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "You must be at least 18 years old",
                },
              })}
            />
            {errors.age && (
              <p className="text-red-500 text-start py-2">
                {errors.age.message}
              </p>
            )}
          </div>

          <Link
            exact
            to={"/login"}
            className="text-sm text-gray-600 hover:underline hover:text-blue-600"
          >
            Already have an account? Log In
          </Link>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-block btn-neutral"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
