import { data, Link } from "react-router-dom";
import { useUserStore } from "../../../store/Auth/User"

const AccountDetails = () => {
    const{currentUser} = useUserStore();
    return(
    <div>
      <div class="flex items-start justify-between p-5 border-b rounded-t">
        <h3 class="text-xl font-semibold">Account Details</h3>
      </div>

      <div class="p-6 space-y-6">
        <form action="#">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                class="text-sm font-medium text-gray-900 block mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                value={currentUser.name}
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="category"
                class="text-sm font-medium text-gray-900 block mb-2"
              >
                Email
              </label>
              <input
                type="text"
                value={currentUser.email}
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="brand"
                class="text-sm font-medium text-gray-900 block mb-2"
              >
                Password
              </label>
              <input
                type="password"
                value={currentUser.password}
                placeholder="......"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="price"
                class="text-sm font-medium text-gray-900 block mb-2"
              >
                Created At
              </label>
              <input
                type="text"
                value={new Date(currentUser.createdAt).toLocaleString()}
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-gray-200 rounded-b">
        <Link to="/UserSideBar/EditAccount"
          class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Edit Details
        </Link>
      </div>
    </div>
    )
}
export default AccountDetails;