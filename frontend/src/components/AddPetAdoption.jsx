import { useState } from "react";
import { Link } from "react-router-dom";
import { usePetAdoptionStore } from "../store/PetAdoption/PetAdoption";
import toast from "react-hot-toast";

const AddPetAdoption = () => {
  const[newAdoption, setnewAdoption] = useState({Petname:"",PetImage:"",category:"",breed:"",Age:"",sex:"",weight:"",medicalhistory:""});
  const {createPetAdoption} = usePetAdoptionStore();  
  const handleAddAdoption = async() => {
    const{success,message} = await createPetAdoption(newAdoption);
    if (success) toast.success(message);
    else toast.error(message);
  }
  return(
    <section class="flex-grow container mx-auto p-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Pet</h1>
        
        <form action="/addBlog" method="POST" class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    
            <div class="mb-4">
                <label for="title" class="block text-gray-700 font-semibold mb-2">Pet Name</label>
                <input type="text" id="title" name="title" required value={newAdoption.Petname} onChange={(e) => setnewAdoption({...newAdoption,Petname: e.target.value})}
                       class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Enter Pet Name"/>
            </div>
    
            <div class="mb-4">
                <label for="subtitle" class="block text-gray-700 font-semibold mb-2">Pet Image</label>
                <input type="text" id="subtitle" name="subtitle" required value={newAdoption.PetImage} onChange={(e) => setnewAdoption({...newAdoption,PetImage: e.target.value})}
                       class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Enter Image path"/>
            </div>

            <div class="mb-4">
                <label for="subtitle" class="block text-gray-700 font-semibold mb-2">Category</label>
                <input type="text" id="subtitle" name="subtitle" required value={newAdoption.category} onChange={(e) => setnewAdoption({...newAdoption,category: e.target.value})}
                       class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Enter Category"/>
            </div>

             <div class="mb-4">
                <label for="subtitle" class="block text-gray-700 font-semibold mb-2">Breed</label>
                <input type="text" id="subtitle" name="subtitle" required value={newAdoption.breed} onChange={(e) => setnewAdoption({...newAdoption,breed: e.target.value})}
                       class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Enter Breed"/>
            </div>

             <div class="mb-4">
                <label for="subtitle" class="block text-gray-700 font-semibold mb-2">Age</label>
                <input type="text" id="subtitle" name="subtitle" required value={newAdoption.Age} onChange={(e) => setnewAdoption({...newAdoption,Age: e.target.value})}
                       class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Enter Age"/>
            </div>

             <div class="mb-4">
                <label for="subtitle" class="block text-gray-700 font-semibold mb-2">Sex</label>
                <input type="text" id="subtitle" name="subtitle" required value={newAdoption.sex} onChange={(e) => setnewAdoption({...newAdoption,sex: e.target.value})}
                       class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Enter Sex"/>
            </div>

            <div class="mb-4">
                <label for="subtitle" class="block text-gray-700 font-semibold mb-2">Weight</label>
                <input type="text" id="subtitle" name="subtitle" required value={newAdoption.weight} onChange={(e) => setnewAdoption({...newAdoption,weight: e.target.value})}
                       class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Enter Weight"/>
            </div>
  
            <div class="mb-4">
                <label for="description" class="block text-gray-700 font-semibold mb-2">Medical Histoty</label>
                <textarea id="description" name="description" required value={newAdoption.medicalhistory} onChange={(e) => setnewAdoption({...newAdoption,medicalhistory: e.target.value})}
                          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Medical records"></textarea>
            </div>

            <div class="flex gap-4 justify-content-center">
                 <div class="text-center">
                <Link to="/AdminAccount/AdminAdoption">  
                <button type="cacel"
                        class="bg-gray-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-gray-700 transition">
                    Cancel
                </button>
                </Link>  
            </div>

            <div class="text-center">
                 <Link to="/AdminAccount/AdminAdoption">  
                <button type="submit" onClick={handleAddAdoption}
                        class="bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition">
                    Add Pet
                </button>
                </Link>
            </div>
                
            </div>         
        </form>
    </section>
  )
}

export default AddPetAdoption;