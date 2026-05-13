import { useEffect, useState } from "react";
import { useUserStore } from "../../../store/Auth/User";
import {
  FaRegEdit,
  FaSearch,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import toast from "react-hot-toast";

const UserPage = () => {
  const { user, fetchUsers, updateUser, deleteUser } =
    useUserStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = async (u) => {
    const newName = prompt("Enter new name:", u.name);

    if (!newName || newName.trim() === "") return;

    const { success, message } = await updateUser(u._id, {
      ...u,
      name: newName,
    });

    if (success) toast.success(message);
    else toast.error(message);
  };

  const handleDelete = async (u) => {
    if (!confirm(`Are you sure want to delete ${u.name}?`)) return;

    const { success, message } = await deleteUser(u._id);

    if (success) toast.success(message);
    else toast.error(message);
  };

  const filteredUsers = user.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-6 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FaUsers />
                User Management
              </h1>

              <p className="mt-2 text-indigo-100 text-sm">
                Manage all registered users and admin accounts.
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full sm:w-80 pl-11 pr-4 py-3 rounded-xl border-none outline-none text-gray-700 shadow-lg"
              />

              <FaSearch className="absolute top-4 left-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* Total Users */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm">
                  Total Users
                </h2>

                <p className="text-3xl font-bold text-indigo-600 mt-2">
                  {user.length}
                </p>
              </div>

              <div className="bg-indigo-100 text-indigo-600 p-4 rounded-2xl">
                <HiUserGroup size={28} />
              </div>
            </div>
          </div>

          {/* Admins */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm">
                  Admin Users
                </h2>

                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {
                    user.filter(
                      (u) =>
                        u.role?.toLowerCase() === "admin"
                    ).length
                  }
                </p>
              </div>

              <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl">
                <FaUserShield size={24} />
              </div>
            </div>
          </div>

          {/* Normal Users */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm">
                  Normal Users
                </h2>

                <p className="text-3xl font-bold text-pink-600 mt-2">
                  {
                    user.filter(
                      (u) =>
                        !u.role ||
                        u.role?.toLowerCase() === "member" ||
                        u.role?.toLowerCase() === "user"
                    ).length
                  }
                </p>
              </div>

              <div className="bg-pink-100 text-pink-600 p-4 rounded-2xl">
                <FaUsers size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="min-w-full">

              {/* Table Head */}
              <thead className="bg-gray-900 text-white">
                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Joined Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Role
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>

                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u, index) => (
                    <tr
                      key={u._id}
                      className={`border-b hover:bg-indigo-50 transition duration-200 ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      }`}
                    >

                      {/* User */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">

                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow">
                            {u.name?.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {u.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              Registered User
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-5 text-gray-600">
                        {u.email}
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-5 text-gray-600">
                        {new Date(
                          u.createdAt
                        ).toLocaleDateString()}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            u.role?.toLowerCase() === "admin"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {u.role || "User"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() => handleEdit(u)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-xl transition duration-200"
                          >
                            <FaRegEdit size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(u)}
                            className="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-xl transition duration-200"
                          >
                            <MdDelete size={20} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;