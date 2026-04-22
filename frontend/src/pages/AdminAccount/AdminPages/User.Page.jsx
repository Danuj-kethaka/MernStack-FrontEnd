import { useEffect } from "react";
import { useUserStore } from "../../../store/Auth/User";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const UserPage = () => {
  const { user, fetchUsers, updateUser, deleteUser } = useUserStore();

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

  return (
    <div className="mt-20 w-full px-4 sm:px-6 lg:px-8">
      <div className="p-5 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-6">All Users</h1>

        {user.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {user.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {u.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.email}
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(u.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.role || "User"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-2"
                        onClick={() => handleEdit(u)}
                      >
                        <FaRegEdit size={20} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(u)}
                      >
                        <MdDelete size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
