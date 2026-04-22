import { create } from "zustand";
import { useUserStore } from "../Auth/User.js";

export const usePetAdoptionStore = create((set) => ({
    PetAdoption: [],
    setnewPetAdoption: (PetAdoption) => set({PetAdoption}),

    createPetAdoption: async(newPetAdoption) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const{accessToken} = useUserStore.getState();
        if(!newPetAdoption.Petname || !newPetAdoption.PetImage || !newPetAdoption.category || !newPetAdoption.breed || !newPetAdoption.Age || !newPetAdoption.sex || !newPetAdoption.weight || !newPetAdoption.medicalhistory){
            return { success: false, message: "Please provide all fields" };
        }
        if(!accessToken){
           return { success: false, message: "You must be logged in" };
        }
        try{
            const res = await fetch(`${API_URL}/api/petadoption`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newPetAdoption),
            });
             const data = await res.json();
            if(!res.ok){
                return { success: false, message: data.message || "Failed to Add Pet Adoption" };
            }
            set((state) => ({
                PetAdoption: [...state.PetAdoption, data.data],
            }));
            return{success: true, message: "Pet Adoption successfully"};
        }catch(error){
            console.error("Create Pet Adoption error: ",error);
            return{success: false, message: "Something went wrong"};
        }
    },

    fetchPetAdoption:async() => {
        const API_URL = import.meta.env.VITE_API_URL;
        const {accessToken} = useUserStore.getState();
        try{
            const res= await fetch(`${API_URL}/api/petadoption`,{
                headers: {
                     Authorization: `Bearer ${accessToken}`,
                }
            });
            const data = await res.json();
            if(res.ok)set({PetAdoption: data.data});
        }catch(error){
            console.error("Fetch Pet Adoption error:",error);
        }
    },

    updatePetAdoption:async(PetAdoptionid,updatePetAdoption) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const {accessToken} = useUserStore.getState();
        const res = await fetch(`${API_URL}/api/petadoption/${PetAdoptionid}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                 Authorization: `Bearer ${accessToken}`,
            },
            body:JSON.stringify(updatePetAdoption),
        });
        const data = await res.json();
        if(!data.success)return{success:false,message:data.message};
        set((state) => ({
            PetAdoption:state.PetAdoption.map((PetAdoption) => (PetAdoption._id === PetAdoptionid? data.data : PetAdoption)),  
        }));
        return{success:true,message:data.message};
    },

    deletePetAdoption: async(PetAdoptionid,deletePetAdoption) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const {accessToken} = useUserStore.getState();
        const res = await fetch(`${API_URL}/api/petadoption/${PetAdoptionid}`,{
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await res.json();
        if(!data.success)return{success:false,message:data.message};
        set((state) => ({
            PetAdoption: state.PetAdoption.filter((PetAdoption) => (PetAdoption._id === PetAdoptionid? data.data : PetAdoption)),
        }));
        return{success:true,message:data.message};
    }
}))