import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppointmentStore } from "../../../store/Appointment/Appointment.js";
import { create } from "zustand";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useUserStore } from "../../../store/Auth/User.js";

const AppointmentPage = () => {
  const [newAppointment,setnewAppointment] = useState({petname: "",date: "",time: "",mobilenumber: "",category: "",reason: "",});
  const {createAppointment,fetchAppointments,appointments,setAppointments} = useAppointmentStore();
  const [selected, setSelected] = useState(true);
  const handleAddAppointment = async () => {
    const {success,message} = await createAppointment(newAppointment);
      if(success){
        toast.success(message);
        setnewAppointment({petname: "", date: "",time: "",mobilenumber: "",category: "",reason: ""});
        fetchAppointments();
      }else{
        toast.error(message);
      }}
  const { accessToken } = useUserStore.getState();
  useEffect(() => {
  setAppointments([]);   
  if (accessToken) fetchAppointments();
  }, [accessToken]);

    return ( 
      <div className="relative w-full mt-4 rounded-md border h-10 p-1 bg-gray-200">
        <div className="relative w-full h-full flex items-center">
          <div
            onClick={() => setSelected(true)}
            className="w-full flex justify-center text-gray-400 cursor-pointer text-[10px] sm:text-sm"
          >
            <button>Current Appointments</button>
          </div>

          <div
            onClick={() => setSelected(false)}
            className="w-full flex justify-center text-gray-400 cursor-pointer text-[10px] sm:text-sm"
          >
            <button>Book Appointment</button>
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
          {selected ? "Current Appointments" : "Book Appointment"}
        </span>
        <div className="mt-6">
          {selected ? (
            <div>
              <div>
                {appointments.length === 0 ? (
                <p className="text-gray-500">
                  No appointments available
                </p>
              ) : (
                appointments
                .filter((appointment) => appointment !== null)
                .map((appointment) => (
                  <div
                    key={appointment._id}
                    className="p-4 mb-3 border rounded-lg shadow-sm"
                  >
                    <p><b>Pet:</b> {appointment.petname}</p>
                    <p><b>Date:</b> {new Date(appointment.date).toLocaleDateString()}</p>
                    <p><b>Time:</b> {appointment.time}</p>
                    <p><b>status:</b> {appointment.status}</p>
                  </div>
                ))
              )}
              </div>
            </div>
          ) : (
            <div>
             <div class="p-6 space-y-6">
                <form action="#">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Pet Name
                      </label>
                      <input
                        type="text" 
                        name="name"  
                        value={newAppointment.petname}
                        onChange={(e) => setnewAppointment({...newAppointment,petname: e.target.value})}
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="category"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Category
                      </label>
                      <input
                        type="text" 
                        name="category"
                        value={newAppointment.category}
                        onChange={(e) => setnewAppointment({...newAppointment,category: e.target.value})}      
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="brand"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Date
                      </label>
                      <input
                        type="date"   
                        value={newAppointment.date}
                        onChange={(e) => setnewAppointment({...newAppointment,date: e.target.value})}            
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="price"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Time
                      </label>
                      <input
                        type="time"  
                        value={newAppointment.time}
                        onChange={(e) => setnewAppointment({...newAppointment,time: e.target.value})}              
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="price"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="search" 
                        value={newAppointment.mobilenumber}
                        onChange={(e) => setnewAppointment({...newAppointment,mobilenumber: e.target.value})}               
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                    </div>
                    <div class="col-span-full">
                      <label
                        for="product-details"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Reason
                      </label>
                      <textarea
                        id="product-details"
                        rows="6"
                        value={newAppointment.reason}
                        onChange={(e) => setnewAppointment({...newAppointment,reason: e.target.value})}   
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div class="p-6 border-t border-gray-200 rounded-b">
                <button onClick={handleAddAppointment}
                  class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
);
};
export default AppointmentPage;
