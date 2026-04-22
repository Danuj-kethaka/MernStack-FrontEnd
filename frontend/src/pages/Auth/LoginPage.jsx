import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/Auth/User.js";
import toast from "react-hot-toast";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const { signInUser } = useUserStore();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const { success, message, user } = await signInUser(loginUser);
    if (success) {
      toast.success(message || "Login successfully");
      setLoginUser({ email: "", password: "" });
      if (user.role === "admin") {
        navigate("/AdminAccount");
      } else {
        navigate("/UserSideBar");
      }
    } else {
      toast.error(message || "Login failed");
    }
  };
  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-15 text-center text-2xl/9 font-bold tracking-tight text-black">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignIn} method="POST" class="space-y-6">
          <div>
            <label
              for="email"
              class="block text-sm/6 font-medium text-black-100"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                placeholder="Enter your email"
                type="email"
                value={loginUser.email}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, email: e.target.value })
                }
                class="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm/6 font-medium text-black-100"
              >
                Password
              </label>
              <div class="text-sm">
                <Link
                  to="#"
                  class="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div class="mt-2">
              <input
                placeholder="Enter password"
                type="password"
                value={loginUser.password}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, password: e.target.value })
                }
                class="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-black-400">
          Not a member?
          <Link
            to="/signup"
            class="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
