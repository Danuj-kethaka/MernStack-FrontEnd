import { create } from "zustand";
import { useUserStore } from "../Auth/User.js";
import { persist } from "zustand/middleware";

export const usePetProfileStore = create((set) => ({
    PetProfile: [],
    setnewPetProfile: (PetProfile) => set({PetProfile}),
    createPetProfile: async(newPetProfile) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const { accessToken } = useUserStore.getState();
        if(!newPetProfile.Petname || !newPetProfile.category || !newPetProfile.breed || !newPetProfile.Age || !newPetProfile.sex || !newPetProfile.weight || !newPetProfile.medicalhistory){
            return { success: false, message: "Please provide all fields" };
        }
        if(!accessToken){
           return { success: false, message: "You must be logged in" };
        }
        try{
            const res = await fetch(`${API_URL}/api/petprofile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newPetProfile),
            });
            const data = await res.json();
            if(!res.ok){
                return { success: false, message: data.message || "Failed to create Pet Profile" };
            }
            set((state) => ({
                PetProfile: [...state.PetProfile, data.data],
            }));

            return{success: true, message: "Pet Profile created successfully"};
        }catch(error){
            console.error("Create Pet Profile error: ",error);
            return{success: false, message: "Something went wrong"};
        }
    },

    fetchPetProfile:async () => {
        const API_URL = import.meta.env.VITE_API_URL;
        const {accessToken} = useUserStore.getState();
        try{
            const res= await fetch(`${API_URL}/api/petprofile`,{
                headers: {
                     Authorization: `Bearer ${accessToken}`,
                }
            });
            const data = await res.json();
            if(res.ok) set({PetProfile: data.data});
        }catch(error){
            console.error("Fetch Pet Profile error:",error);
        }
    },
     
    updatePetProfile: async(PetProfileid,updatepetprofile) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const {accessToken} = useUserStore.getState();
        const res = await fetch(`${API_URL}/api/petprofile/${PetProfileid}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                 Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(updatepetprofile),
        });
        const data = await res.json();
        if(!data.success)return{success:false,message: data.message};
        set((state) => ({
            PetProfile: state.PetProfile.map((PetProfile) => (PetProfile._id === PetProfileid? data.data :PetProfile)),
        }));
        return{success:true,message:data.message};
    },

    deletePetprofile: async(PetProfileid,deletepetprofile) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const {accessToken} = useUserStore.getState();
        const res = await fetch(`${API_URL}/api/petprofile/${PetProfileid}`,{
           method: "DELETE",
           headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await res.json();
        if(!data.success)return{success:false,message: data.message};
         set((state) => ({
            PetProfile: state.PetProfile.filter((PetProfile) => (PetProfile._id === PetProfileid? data.data :PetProfile)),
        }));
        return{success:true,message:data.message};
    }
}))