import { useEffect, useState } from "react";
import { usePetAdoptionStore } from "../../../store/PetAdoption/PetAdoption.js";
import { FaRegEdit, FaSearch, FaPaw } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AdminAdoptionPage = () => {
  const {
    PetAdoption,
    fetchPetAdoption,
    updatePetAdoption,
    deletePetAdoption,
  } = usePetAdoptionStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPetAdoption();
  }, []);

  const handleEdit = async (pet) => {
    const Petname = prompt("Pet Name:", pet.Petname);
    if (!Petname) return;

    const PetImage = prompt("Pet Image URL:", pet.PetImage);
    if (!PetImage) return;

    const category = prompt("Category:", pet.category);
    if (!category) return;

    const breed = prompt("Breed:", pet.breed);
    if (!breed) return;

    const Age = prompt("Age:", pet.Age);
    if (!Age || isNaN(Age)) return;

    const sex = prompt("Sex (male/female):", pet.sex);
    if (!sex || (sex !== "male" && sex !== "female")) return;

    const weight = prompt("Weight:", pet.weight);
    if (!weight || isNaN(weight)) return;

    const medicalhistory = prompt(
      "Medical History:",
      pet.medicalhistory
    );
    if (!medicalhistory) return;

    const { success, message } = await updatePetAdoption(pet._id, {
      Petname,
      PetImage,
      category,
      breed,
      Age: Number(Age),
      sex,
      weight: Number(weight),
      medicalhistory,
    });

    if (success) toast.success(message);
    else toast.error(message);
  };

  const handleDelete = async (pet) => {
    if (!confirm(`Are you sure want to delete ${pet.Petname}?`)) return;

    const { success, message } = await deletePetAdoption(pet._id);

    if (success) toast.success(message);
    else toast.error(message);
  };

  const filteredPets = PetAdoption.filter(
    (pet) =>
      pet &&
      pet.Petname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl shadow-xl p-6 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FaPaw />
                Pet Adoption Dashboard
              </h1>

              <p className="mt-2 text-orange-100 text-sm">
                Manage pet adoptions and available pets for adoption.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search pet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-72 pl-11 pr-4 py-3 rounded-xl border-none outline-none text-gray-700 shadow-lg"
                />
                <FaSearch className="absolute top-4 left-4 text-gray-400" />
              </div>

              {/* Add Button */}
              <Link to="/AdminAccount/AddPetAdoption">
                <button className="bg-white text-orange-600 hover:bg-orange-100 font-bold px-5 py-3 rounded-xl shadow-lg transition duration-200">
                  + Add New Pet
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Total Pets</h2>
            <p className="text-3xl font-bold text-orange-500 mt-2">
              {PetAdoption.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Dogs</h2>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {
                PetAdoption.filter(
                  (pet) => pet?.category?.toLowerCase() === "dog"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Cats</h2>
            <p className="text-3xl font-bold text-pink-500 mt-2">
              {
                PetAdoption.filter(
                  (pet) => pet?.category?.toLowerCase() === "cat"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Other Pets</h2>
            <p className="text-3xl font-bold text-blue-500 mt-2">
              {
                PetAdoption.filter(
                  (pet) =>
                    pet?.category?.toLowerCase() !== "dog" &&
                    pet?.category?.toLowerCase() !== "cat"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">

              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Pet
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
                      No pet adoptions found.
                    </td>
                  </tr>
                ) : (
                  filteredPets.map((pet, index) => (
                    <tr
                      key={pet._id}
                      className={`border-b hover:bg-orange-50 transition duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {/* Pet Info */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={pet.PetImage}
                            alt={pet.Petname}
                            className="h-16 w-16 object-cover rounded-2xl border shadow-sm"
                          />

                          <div>
                            <p className="font-bold text-gray-800">
                              {pet.Petname}
                            </p>

                            <p className="text-sm text-gray-500">
                              Ready for adoption
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
                          {pet.category}
                        </span>
                      </td>

                      {/* Breed */}
                      <td className="px-6 py-5 text-gray-600">
                        {pet.breed}
                      </td>

                      {/* Age */}
                      <td className="px-6 py-5 text-gray-600">
                        {pet.Age} yrs
                      </td>

                      {/* Sex */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            pet.sex === "male"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-pink-100 text-pink-600"
                          }`}
                        >
                          {pet.sex}
                        </span>
                      </td>

                      {/* Weight */}
                      <td className="px-6 py-5 text-gray-600">
                        {pet.weight} kg
                      </td>

                      {/* Medical History */}
                      <td className="px-6 py-5 text-gray-600 max-w-xs truncate">
                        {pet.medicalhistory}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">
                          
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

export default AdminAdoptionPage;