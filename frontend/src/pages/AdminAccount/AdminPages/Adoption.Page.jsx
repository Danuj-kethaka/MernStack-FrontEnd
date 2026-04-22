import { useEffect } from "react";
import { usePetAdoptionStore } from "../../../store/PetAdoption/PetAdoption.js";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminAdoptionPage = () => {
    const{PetAdoption,createPetAdoption,fetchPetAdoption,updatePetAdoption,deletePetAdoption} = usePetAdoptionStore();
    const handleEdit = async (pet) => {
    const Petname = prompt("Pet Name:", pet.Petname);if (!Petname) return;
    const PetImage = prompt("Pet Image URL:", pet.PetImage);if (!PetImage) return;
    const category = prompt("Category:", pet.category);if (!category) return;
    const breed = prompt("Breed:", pet.breed);if (!breed) return;
    const Age = prompt("Age:", pet.Age);if (!Age || isNaN(Age)) return;
    const sex = prompt("Sex (male/female):", pet.sex);if (!sex || (sex !== "male" && sex !== "female")) return;
    const weight = prompt("Weight:", pet.weight);if (!weight || isNaN(weight)) return;
    const medicalhistory = prompt("Medical History:", pet.medicalhistory);if (!medicalhistory) return;
    const { success, message } = await updatePetAdoption(pet._id, {Petname,PetImage,category,breed,Age: Number(Age),sex,weight: Number(weight),medicalhistory,});
    if (success) toast.success(message);
    else toast.error(message);
    },

    handleDelete = async (pet) => {
    if (!confirm(`Are you sure want to delete ${pet.Petname}?`)) return;
    const { success, message } = await deletePetAdoption(pet._id);
    if (success) toast.success(message);
    else toast.error(message);
    }
    useEffect(() => {
        fetchPetAdoption();
    },[]);
    return(
        <div className="mt-20 w-full px-4 sm:px-6 lg:px-8">
              <div className="p-5 bg-white shadow rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Pet Adoptions</h1>
                <Link to="/AdminAccount/AddPetAdoption">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-semibold shadow">
                    Add New Pet
                </button>
                </Link>
                </div>
                {PetAdoption.length === 0 ? (
                <p className="text-gray-500">No adoptions found.</p>
                ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            PetName
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Image
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            category
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            breed 
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
                            sex
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            weight
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Medical History
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Action
                        </th>
                        </tr>
                    </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {PetAdoption.filter(Boolean).map((pet) => (
                            <tr key={pet._id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4  whitespace-nowrap text-sm font-medium text-gray-900">
                                {pet.Petname}
                            </td>
                            <td className="px-6 py-4  whitespace-nowrap text-sm font-medium text-gray-900">
                                <img src={pet.PetImage}  alt={pet.name}   className="h-16 w-16 object-cover rounded-md border"/>
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

export default AdminAdoptionPage;