import { useEffect } from "react";
import { usePetProfileStore } from "../../../store/PetProfile/PetProfile.js";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const AdminPetProfile = () => {
  const {fetchPetProfile,PetProfile,updatePetProfile,deletePetprofile} = usePetProfileStore();
  useEffect(() => {
  fetchPetProfile();},[]);

  const handleEdit = async(pet) => {
    const newMedicalHistory = prompt("enter medical records: ",pet.medicalhistory);
    if(!newMedicalHistory || newMedicalHistory.trim() === "")return;
    const{success,message} = await updatePetProfile(pet._id,{
      ...pet,medicalhistory:newMedicalHistory,
    });
    if (success) toast.success(message);
    else toast.error(message);
  }

  const handleDelete = async(pet) => {
    if (!confirm(`Are you sure want to delete ${pet.Petname}?`)) return;
    const { success, message } = await deletePetprofile(pet._id);
    if (success) toast.success(message);
    else toast.error(message);
  }
  
  return(
    <div className="mt-20 w-full px-4 sm:px-6 lg:px-8">
          <div className="p-5 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-6">All Pet Profiles</h1>
    
            {PetProfile.length === 0 ? (
              <p className="text-gray-500">No Profile found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pet Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Breed
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Age
                      </th>
                       <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sex
                      </th>
                       <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Weight
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Medical History
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
                    {PetProfile.map((pet) => (
                      <tr key={pet._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4  whitespace-nowrap text-sm font-medium text-gray-900">
                          {pet.Petname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pet.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pet.breed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pet.Age}
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pet.sex}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pet.weight}
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pet.medicalhistory}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            className="text-blue-600 hover:text-blue-900 mr-2"
                            onClick={() => handleEdit(pet)}
                          >
                            <FaRegEdit size={20} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(pet)}
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
  )
}

export default AdminPetProfile;