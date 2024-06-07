import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useForm } from "react-hook-form";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loading, login: handleLogin, error } = useLogin();

  const handleData = (data) => {
    handleLogin(data);
  };
  return (
    <div class="relative flex flex-col items-center justify-center min-h-[75vh] overflow-hidden">
      <div class="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center text-gray-700">Login</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 text-center py-2">{error}</p>}

        <form onSubmit={handleSubmit(handleData)} class="space-y-4">
          <div>
            <label class="label">
              <span class="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              class="w-full input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p class="text-red-500 text-start py-2">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label class="label">
              <span class="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              class="w-full input input-bordered"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p class="text-red-500 text-start py-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <Link
            to={"/register/user"}
            class="text-sm text-gray-600 hover:underline hover:text-blue-600"
          >
            Don't have an account? Register
          </Link>
          <div>
            <button
              type="submit"
              disabled={loading}
              class="btn btn-block btn-neutral"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
