import { useAppointmentStore } from "../../store/Appointment/Appointment.js";
import { useUserStore } from "../../store/Auth/User";
import { useEffect } from "react";
import { usePetProfileStore } from "../../store/PetProfile/PetProfile.js";
import { usePetAdoptionStore } from "../../store/PetAdoption/PetAdoption.js";

const AdminDashBoard = () => {
      const {user} = useUserStore();
      const {PetProfile,fetchPetProfile} = usePetProfileStore();
      const {appointments,fetchAppointments} = useAppointmentStore();
      const {PetAdoption,fetchPetAdoption} = usePetAdoptionStore();
      useEffect(() => {
      fetchAppointments(),fetchPetProfile(),fetchPetAdoption()
      }, []);
  return (
    <div className="mt-20 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Total Pets</h2>
          <p className="text-gray-600">{PetProfile.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Total Users</h2>
          <p className="text-gray-600">{user.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Total Appointments</h2>
          <p className="text-gray-600">{appointments.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Total Adoptions</h2>
          <p className="text-gray-600">{PetAdoption.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
