import { useState } from "react";
import { useUserStore } from "../../../store/Auth/User";
import { data, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditAccount =  () => {
    const{currentUser,updateUser} = useUserStore();
    const [updatedUser,setUpdateduser] = useState(currentUser);
    const handleUpdateUser = async(userid,updatedUser) => {
        const{success,message} = await updateUser(userid,updatedUser);
        if(success){
            toast.success(message);
            Navigate("/UserSideBar/AccountDetails")
        }else{
            toast.error(message);
        }
    }
    return(
    <div>
      <div class="flex items-start justify-between p-5 border-b rounded-t">
        <h3 class="text-xl font-semibold">Edit Details</h3>
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
                name="name"
                id="name"
                value={updatedUser.name}
                onChange={(e) => setUpdateduser({...updatedUser,name:e.target.value})}
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
                name="email"
                id="email"
                value={updatedUser.email}
                onChange={(e) => setUpdateduser({...updatedUser,email: e.target.value})}
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
                value={updatedUser.password}
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
                value={new Date(updatedUser.createdAt).toLocaleString()}
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-gray-200 rounded-b">
        <Link 
          class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
          onClick={() => handleUpdateUser(currentUser._id,updatedUser)}
        >
          Save Details
        </Link>
      </div>
    </div>
    )
} 

export default EditAccount;