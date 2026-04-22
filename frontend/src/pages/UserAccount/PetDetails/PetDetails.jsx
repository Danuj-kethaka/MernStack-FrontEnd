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
            <div>
              {PetProfile.length === 0 ? (
                 <p className="text-gray-500">
                  No Pet profile available
                </p>): (
                  PetProfile
                  .filter((PetProfile) => PetProfile !== null)
                  .map((pet) => (
                    <>
                    <section class="py-10 my-auto dark:bg-gray-900">
                        <div class="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
                          <div class="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                            <div class="">
                              <h1
                                class="lg:text-3xl md:text-2xl text-xl font-serif font-extrabold mb-2 dark:text-white">
                                Pet Profile
                              </h1>
                              <form>
                                <div
                                  class="w-full rounded-sm bg-[url('https://static.vecteezy.com/system/resources/previews/012/700/417/non_2x/domestic-pets-background-template-free-vector.jpg')] bg-cover bg-center bg-no-repeat items-center">
                                  <div class="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('data:image/png;base64,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')] bg-cover bg-center bg-no-repeat"> </div>
                                  <div class="flex justify-end">
                                    <input type="file" name="profile" id="upload_cover" hidden required/>  
                                   </div>
                                </div>
                                <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
                                  <div class="w-full  mb-4 mt-6">
                                    <label className="mb-2 dark:text-gray-300">Pet Name</label>
                                      <p className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                                        {pet.Petname}
                                      </p>
                                    </div>
                                  <div className="w-full mb-4 mt-6">
                                    <label className="mb-2 dark:text-gray-300">Pet Category</label>
                                    <p className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                                      {pet.category}
                                    </p>
                                  </div>
                                </div>
                                <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
                                  <div class="w-full  mb-4 mt-6">
                                    <label className="mb-2 dark:text-gray-300">Breed</label>
                                      <p className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                                        {pet.breed}
                                      </p>
                                    </div>
                                  <div className="w-full mb-4 mt-6">
                                    <label className="mb-2 dark:text-gray-300">Pet Age</label>
                                    <p className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                                      {pet.Age}
                                    </p>
                                  </div>
                                </div>
                                 <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
                                  <div class="w-full  mb-4 mt-6">
                                    <label className="mb-2 dark:text-gray-300">Sex</label>
                                      <p className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                                        {pet.sex}
                                      </p>
                                    </div>
                                  <div className="w-full mb-4 mt-6">
                                    <label className="mb-2 dark:text-gray-300">Pet Weight</label>
                                    <p className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                                      {pet.weight}
                                    </p>
                                  </div>
                                </div>
                                <div class="flex flex-col lg:flex-row  gap-2 justify-center w-full">
                                  <div class="w-full">
                                    <h3 class="dark:text-gray-300 mb-2">Medical History</h3>
                                    <p className="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                                      {pet.medicalhistory}
                                    </p>
                                  </div>
                                  
                                  </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </section></>
                  ))
                )}
            </div>
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
                  Book Appointment
                </button>
              </div></>
        )}
      </div>
    </div>
  );
};

export default PetDetailsPage;