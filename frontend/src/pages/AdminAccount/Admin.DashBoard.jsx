import { useAppointmentStore } from "../../store/Appointment/Appointment.js";
import { useUserStore } from "../../store/Auth/User";
import { useEffect } from "react";
import { usePetProfileStore } from "../../store/PetProfile/PetProfile.js";
import { usePetAdoptionStore } from "../../store/PetAdoption/PetAdoption.js";

import {
  FaUsers,
  FaCalendarCheck,
  FaDog,
  FaHeartbeat,
} from "react-icons/fa";

import { MdPets } from "react-icons/md";

import { Link } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#22C55E", "#EF4444", "#FACC15"];

const AdminDashBoard = () => {
  const { user, fetchUsers } = useUserStore();

  const { PetProfile, fetchPetProfile } =
    usePetProfileStore();

  const { appointments, fetchAppointments } =
    useAppointmentStore();

  const { PetAdoption, fetchPetAdoption } =
    usePetAdoptionStore();

  useEffect(() => {
    fetchUsers();
    fetchAppointments();
    fetchPetProfile();
    fetchPetAdoption();
  }, []);

  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending"
  );

  const acceptedAppointments = appointments.filter(
    (a) => a.status === "accepted"
  );

  const rejectedAppointments = appointments.filter(
    (a) => a.status === "rejected"
  );

  /* PIE CHART DATA */
  const appointmentChartData = [
    {
      name: "Accepted",
      value: acceptedAppointments.length,
    },
    {
      name: "Rejected",
      value: rejectedAppointments.length,
    },
    {
      name: "Pending",
      value: pendingAppointments.length,
    },
  ];

  /* BAR CHART DATA */
  const systemData = [
    {
      name: "Users",
      total: user.length,
    },
    {
      name: "Pets",
      total: PetProfile.length,
    },
    {
      name: "Appointments",
      total: appointments.length,
    },
    {
      name: "Adoptions",
      total: PetAdoption.length,
    },
  ];

  return (
    <div className="mt-20 min-h-screen bg-gray-100 p-4 sm:p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back Admin 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here’s what’s happening today.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {/* TOTAL PETS */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition duration-300">
          <div>
            <p className="text-gray-500 text-sm">
              Total Pets
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {PetProfile.length}
            </h2>
          </div>

          <div className="bg-yellow-100 p-4 rounded-2xl">
            <MdPets className="text-yellow-600 text-3xl" />
          </div>
        </div>

        {/* USERS */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition duration-300">
          <div>
            <p className="text-gray-500 text-sm">
              Total Users
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {user.length}
            </h2>
          </div>

          <div className="bg-blue-100 p-4 rounded-2xl">
            <FaUsers className="text-blue-600 text-3xl" />
          </div>
        </div>

        {/* APPOINTMENTS */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition duration-300">
          <div>
            <p className="text-gray-500 text-sm">
              Appointments
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {appointments.length}
            </h2>
          </div>

          <div className="bg-green-100 p-4 rounded-2xl">
            <FaCalendarCheck className="text-green-600 text-3xl" />
          </div>
        </div>

        {/* ADOPTIONS */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition duration-300">
          <div>
            <p className="text-gray-500 text-sm">
              Adoptions
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {PetAdoption.length}
            </h2>
          </div>

          <div className="bg-pink-100 p-4 rounded-2xl">
            <FaDog className="text-pink-600 text-3xl" />
          </div>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Appointment Status Overview
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {appointmentChartData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            System Analytics
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={systemData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="total"
                  fill="#3B82F6"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* RECENT APPOINTMENTS */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-md p-6">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Appointments
            </h2>

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
              {pendingAppointments.length} Pending
            </span>
          </div>

          <div className="space-y-4">
            {appointments.slice(0, 5).map(
              (appointment) => (
                <div
                  key={appointment._id}
                  className="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {appointment.petname}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {new Date(
                        appointment.date
                      ).toLocaleDateString()}{" "}
                      • {appointment.time}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold text-white
                    ${
                      appointment.status ===
                      "accepted"
                        ? "bg-green-500"
                        : appointment.status ===
                          "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <Link to="/AdminAccount/AddPetAdoption">
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl transition">
                Add New Pet
              </button>
            </Link>

            <Link to="/AdminAccount/AdminAppointment">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition">
                View Appointments
              </button>
            </Link>

            <Link to="/AdminAccount/AdminPetProfile">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition">
                Pet Profiles
              </button>
            </Link>

            <Link to="/AdminAccount/users">
              <button className="w-full bg-gray-800 hover:bg-black text-white font-semibold py-3 rounded-xl transition">
                Manage Users
              </button>
            </Link>
          </div>

          {/* EXTRA INFO */}
          <div className="mt-8 bg-red-50 border border-red-100 rounded-2xl p-4">

            <div className="flex items-center gap-3">
              <FaHeartbeat className="text-red-500 text-2xl" />

              <div>
                <p className="font-bold text-gray-800">
                  {
                    acceptedAppointments.length
                  }
                </p>

                <p className="text-sm text-gray-500">
                  Accepted appointments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;