import { useEffect, useState } from "react";
import { usePetProfileStore } from "../../../store/PetProfile/PetProfile.js";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";

const AdminPetProfile = () => {
  const {
    fetchPetProfile,
    PetProfile,
    updatePetProfile,
    deletePetprofile,
  } = usePetProfileStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPetProfile();
  }, []);

  const handleEdit = async (pet) => {
    const newMedicalHistory = prompt(
      "Enter medical records:",
      pet.medicalhistory
    );

    if (!newMedicalHistory || newMedicalHistory.trim() === "") return;

    const { success, message } = await updatePetProfile(pet._id, {
      ...pet,
      medicalhistory: newMedicalHistory,
    });

    if (success) toast.success(message);
    else toast.error(message);
  };

  const handleDelete = async (pet) => {
    if (!confirm(`Are you sure want to delete ${pet.Petname}?`)) return;

    const { success, message } = await deletePetprofile(pet._id);

    if (success) toast.success(message);
    else toast.error(message);
  };

  const filteredPets = PetProfile.filter((pet) =>
    pet.Petname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <FiHeart className="text-pink-200" />
                Pet Profiles Dashboard
              </h1>
              <p className="text-sm mt-2 text-blue-100">
                Manage all registered pet profiles easily.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search pet name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border-none outline-none text-gray-700 shadow-md"
              />
              <FaSearch className="absolute top-4 left-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Total Pets</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {PetProfile.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Cats</h2>
            <p className="text-3xl font-bold text-pink-500 mt-2">
              {
                PetProfile.filter(
                  (pet) => pet.category?.toLowerCase() === "cat"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Dogs</h2>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {
                PetProfile.filter(
                  (pet) => pet.category?.toLowerCase() === "dog"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Other Pets</h2>
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              {
                PetProfile.filter(
                  (pet) =>
                    pet.category?.toLowerCase() !== "dog" &&
                    pet.category?.toLowerCase() !== "cat"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Pet Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Breed
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Sex
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Weight
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Medical History
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPets.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-10 text-gray-500"
                    >
                      No pet profiles found.
                    </td>
                  </tr>
                ) : (
                  filteredPets.map((pet, index) => (
                    <tr
                      key={pet._id}
                      className={`border-b hover:bg-blue-50 transition duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-5 font-semibold text-gray-800">
                        {pet.Petname}
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {pet.category}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {pet.breed}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {pet.Age}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {pet.sex}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {pet.weight}
                      </td>

                      <td className="px-6 py-5 text-gray-600 max-w-xs truncate">
                        {pet.medicalhistory}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            onClick={() => handleEdit(pet)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-xl transition duration-200"
                          >
                            <FaRegEdit size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(pet)}
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

export default AdminPetProfile;