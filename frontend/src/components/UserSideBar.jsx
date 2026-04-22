import { useState } from "react";
import { useUserStore } from "../store/Auth/User.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const UserSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {currentUser,signOutUser} = useUserStore();
  const navigate = useNavigate();
  const handleSignOut = () => {
    const{success,message} = signOutUser();
    if(success){
      toast.success(message);
    }
    navigate("/login");
  };

  return (
    <div className="flex flex-row min-h-screen">
      <aside
        className={`bg-sky-50 h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >

        <div className="relative overflow-hidden">
          <style>
            {`
              .profile-container {
                width: 100px;
                height: 100px;
                background-size: cover;
                background-position: top;
                border-radius: 50%;
                overflow: hidden;  
                border: 2px solid #fff;
              }
            `}
          </style>

          <div
            aria-hidden="true"
            className="inset-y-0 absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0"
          >
            <div className="absolute inset-0 flex">
              <div className="h-full w-1/2" style={{ backgroundColor: "#0a527b" }}></div>
              <div className="h-full w-1/2" style={{ backgroundColor: "#065d8c" }}></div>
            </div>
            <div className="relative flex justify-center">
              <svg
                className="flex-shrink-0"
                width="1750"
                height="220"
                viewBox="0 0 1750 308"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
                <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
                <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
              </svg>
            </div>
          </div>

          <header className="relative pb-4">
            <div className="max-w-7xl">
              <button
                className="mt-1 right-3 p-2 bg-sky-200 rounded-lg hover:bg-sky-300 transition-colors"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                  />
                </svg>
              </button>

              {sidebarOpen && (
                <>
                  <div className="profile-container mx-auto mt-1 mb-3 p-2 flex items-center justify-center bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-white text-center truncate">
                    {currentUser.name}
                  </h1>
                </>
              )}
            </div>
          </header>
        </div>

        <nav className="flex-1 px-0 py-4 space-y-2">
          <Link
            to="AccountDetails"
            className="bg-sky-100 border-sky-600 text-sky-700 hover:bg-sky-200 hover:text-sky-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          >
            <svg
              className="text-sky-500 group-hover:text-sky-500 flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {sidebarOpen && <span className="ml-3 truncate">Account</span>}
          </Link>

          <Link to="PetDetails"
            className="bg-sky-100 border-sky-600 text-sky-700 hover:bg-sky-200 hover:text-sky-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          >
            <svg
              className="text-sky-500 group-hover:text-sky-500 flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            {sidebarOpen && <span className="ml-3 truncate">Pet Details</span>}
          </Link>

          <Link
            to="UserAppointment"
            className="bg-sky-100 border-sky-600 text-sky-700 hover:bg-sky-200 hover:text-sky-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          >
            <svg
              className="text-sky-500 group-hover:text-sky-500 flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
            </svg>
            {sidebarOpen && <span className="ml-3 truncate">Appointments</span>}
          </Link>

        </nav>

        <div className="px-0 py-4 mt-auto">
          <a
            onClick={() => {
              handleSignOut();
            }}
            className="bg-red-100 border-red-600 text-red-700 hover:bg-red-200 hover:text-red-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          >
            <svg
              className="text-red-500 group-hover:text-red-600 flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            {sidebarOpen && <span className="ml-3 truncate">Sign Out</span>}
          </a>
        </div>
      </aside>

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet/>
      </main>
    </div>
  );
};

export default UserSideBar;