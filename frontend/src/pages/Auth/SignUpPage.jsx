import { useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/Auth/User.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { createUser } = useUserStore();
  const handleAddUser = async () => {
    const { success, message } = await createUser(newUser);
    if (success) {
      toast.success(message || "Account created successfully");
      setNewUser({ name: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } else {
      toast.error(message || "Failed to create user");
    }
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-15 text-center text-2xl/9 font-bold tracking-tight text-black">
          Create your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" class="space-y-6">
          <div>
            <label
              for="name"
              class="block text-sm/6 font-medium text-black-100"
            >
              User Name
            </label>
            <div class="mt-2">
              <input
                placeholder="Enter Name"
                name="name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                class="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              for="email"
              class="block text-sm/6 font-medium text-black-100"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                placeholder="Enter your Gmail"
                name="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
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
            </div>
            <div class="mt-2">
              <input
                placeholder="Enter Password"
                name="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                class="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleAddUser}
              class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Create Account
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-black-400">
          already have an account?
          <Link
            to="/login"
            class="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
