import { useEffect, useState } from "react";
import { usePetProfileStore } from "../../../store/PetProfile/PetProfile.js";
import toast from "react-hot-toast";
import { useUserStore } from "../../../store/Auth/User.js";

const PetDetailsPage = () => {
  const[selected,setSelected] = useState(true);
  const[newPetProfile,setnewPetProfile] = useState({Petname: "", category: "", breed: "", Age: "", sex: "", weight: "", medicalhistory: "",});
  const {createPetProfile, fetchPetProfile,PetProfile} = usePetProfileStore();
  const handleCreatePetProfile = async () => {
  const { success, message } = await createPetProfile(newPetProfile);
  if (success) {toast.success(message);
    setnewPetProfile({Petname: "",category: "",breed: "", Age: "",sex: "",weight: "",medicalhistory: "",});
    fetchPetProfile();
  } else {
    toast.error(message);
  }}
  const { accessToken } = useUserStore.getState();
  useEffect(() => {setnewPetProfile({Petname: "",category: "",breed: "",Age: "",sex: "",weight: "",medicalhistory: "",});
; if(accessToken)fetchPetProfile();},[accessToken]);

  return (
    <div className="relative w-full mt-4 rounded-md border h-10 p-1 bg-gray-200">
      <div className="relative w-full h-full flex items-center">
        <div
          onClick={() => setSelected(true)}
          className="w-full flex justify-center text-gray-400 cursor-pointer text-[10px] sm:text-sm"
        >
          <button>Your Pet profile</button>
        </div>

        <div
          onClick={() => setSelected(false)}
          className="w-full flex justify-center text-gray-400 cursor-pointer text-[10px] sm:text-sm"
        >
          <button>Create Pet Profile</button>
        </div>
      </div>

      <span
        className={`bg-white shadow flex items-center justify-center w-1/2 rounded
          h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute
          ${
            selected
              ? "left-1 text-indigo-600 font-semibold"
              : "left-1/2 -ml-1 text-gray-800"
          }
        `}
      >
        {selected ? "Your Pet profile " : "Create Pet Profile"}
      </span>
      <div className="mt-6">
        {selected ? (
          <div>
            {PetProfile.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-10 text-center border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="bg-yellow-100 p-5 rounded-full">
                    🐾
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  No Pet Profiles Yet
                </h2>

                <p className="text-gray-500">
                  Create your first pet profile to manage your pet details.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {PetProfile.filter(Boolean).map((pet) => (
                  <div
                    key={pet._id}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300"
                  >
                    {/* TOP BANNER */}
                    <div className="relative h-40 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600">

                      {/* PET AVATAR */}
                      <div className="absolute -bottom-14 left-6">
                        <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center text-5xl">
                          🐶
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="pt-20 p-6">

                      {/* NAME + CATEGORY */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h1 className="text-3xl font-bold text-gray-800">
                            {pet.Petname}
                          </h1>

                          <p className="text-gray-500 mt-1">
                            {pet.category}
                          </p>
                        </div>

                        <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
                          {pet.sex}
                        </span>
                      </div>

                      {/* INFO GRID */}
                      <div className="grid grid-cols-2 gap-4 mb-6">

                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          <p className="text-gray-400 text-sm mb-1">
                            Breed
                          </p>

                          <h3 className="font-bold text-gray-800">
                            {pet.breed}
                          </h3>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          <p className="text-gray-400 text-sm mb-1">
                            Age
                          </p>

                          <h3 className="font-bold text-gray-800">
                            {pet.Age} Years
                          </h3>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          <p className="text-gray-400 text-sm mb-1">
                            Weight
                          </p>

                          <h3 className="font-bold text-gray-800">
                            {pet.weight} KG
                          </h3>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          <p className="text-gray-400 text-sm mb-1">
                            Status
                          </p>

                          <h3 className="font-bold text-green-600">
                            Healthy
                          </h3>
                        </div>
                      </div>

                      {/* MEDICAL HISTORY */}
                      <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">❤️</span>

                          <h3 className="text-lg font-bold text-gray-800">
                            Medical History
                          </h3>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          {pet.medicalhistory}
                        </p>
                      </div>

                      {/* FOOTER */}
                      <div className="mt-6 flex justify-between items-center">
                        <span className="text-sm text-gray-400">
                          Pet Profile ID
                        </span>

                        <span className="text-sm font-semibold text-gray-700">
                          #{pet._id.slice(-6)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <><div class="p-6 space-y-6">
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label class="text-sm font-medium text-gray-900 block mb-2">Pet Name</label>
                    <input type="text" name="name" value={newPetProfile.Petname} onChange={(e) => setnewPetProfile({ ...newPetProfile, Petname: e.target.value })} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="category" class="text-sm font-medium text-gray-900 block mb-2">
                      Category
                    </label>
                    <input type="text" name="category" value={newPetProfile.category} onChange={(e) => setnewPetProfile({ ...newPetProfile, category: e.target.value })} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="Breed" class="text-sm font-medium text-gray-900 block mb-2">
                      Breed
                    </label>
                    <input type="text" name="Breed" value={newPetProfile.breed} onChange={(e) => setnewPetProfile({ ...newPetProfile, breed: e.target.value })} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="Age" class="text-sm font-medium text-gray-900 block mb-2">
                      Age
                    </label>
                    <input type="number" name="Age" value={newPetProfile.Age} onChange={(e) => setnewPetProfile({ ...newPetProfile, Age: e.target.value })} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="Sex" class="text-sm font-medium text-gray-900 block mb-2">
                      Sex
                    </label>
                    <input type="text" name="Sex" value={newPetProfile.sex} onChange={(e) => setnewPetProfile({ ...newPetProfile, sex: e.target.value })} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="Weight" class="text-sm font-medium text-gray-900 block mb-2">
                      Weight
                    </label>
                    <input type="number" name="Weight" value={newPetProfile.weight} onChange={(e) => setnewPetProfile({ ...newPetProfile, weight: e.target.value })} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" />
                  </div>
                  <div class="col-span-full">
                    <label for="Weight" class="text-sm font-medium text-gray-900 block mb-2">
                      Medical History
                    </label>
                    <textarea id="product-details" value={newPetProfile.medicalhistory} onChange={(e) => setnewPetProfile({ ...newPetProfile, medicalhistory: e.target.value })} rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"></textarea>
                  </div>
                </div>
              </form>
            </div><div class="p-6 border-t border-gray-200 rounded-b">
                <button onClick={handleCreatePetProfile}
                  class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create Pet Profile
                </button>
              </div></>
        )}
      </div>
    </div>
  );
};

export default PetDetailsPage;