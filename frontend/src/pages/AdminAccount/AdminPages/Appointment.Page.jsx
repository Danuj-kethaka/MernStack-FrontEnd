import { BsFillXSquareFill, BsCheckSquareFill } from "react-icons/bs";
import {
  FaCalendarCheck,
  FaSearch,
  FaClock,
} from "react-icons/fa";

import { useAppointmentStore } from "../../../store/Appointment/Appointment.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";

import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AdminAppointmentPage = () => {
  const {
    appointments,
    fetchAppointments,
    updateAppointment,
  } = useAppointmentStore();

  const safeAppointments =
    appointments?.filter(Boolean) || [];

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const mappedEvents = safeAppointments.map((a) => {
      const dateObj = new Date(a.date);

      const [hours, minutes] = a.time
        .split(":")
        .map(Number);

      dateObj.setHours(hours, minutes);

      return {
        id: a._id,
        title: `${a.petname} (${a.status})`,
        start: dateObj,
        end: new Date(
          dateObj.getTime() + 30 * 60 * 1000
        ),
        status: a.status,
      };
    });

    setEvents(mappedEvents);
  }, [appointments]);

  const handleEdit = async (
    appointmentId,
    status
  ) => {
    const { success, message } =
      await updateAppointment(
        appointmentId,
        status
      );

    if (success) toast.success(message);
    else toast.error(message);
  };

  const pendingAppointments =
    safeAppointments.filter(
      (a) =>
        a.status === "pending" &&
        a.petname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  const acceptedAppointments =
    safeAppointments.filter(
      (a) =>
        a.status === "accepted" &&
        a.petname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  const rejectedAppointments =
    safeAppointments.filter(
      (a) =>
        a.status === "rejected" &&
        a.petname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  const renderTable = (
    title,
    data,
    bgColor
  ) => (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mb-8">
      
      {/* Table Header */}
      <div
        className={`${bgColor} px-6 py-4 flex items-center justify-between`}
      >
        <h2 className="text-white text-xl font-bold">
          {title}
        </h2>

        <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
          {data.length} Appointments
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-900 text-white">
            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Pet Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Appointment Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Time
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Mobile Number
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Action
              </th>

            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No appointments found.
                </td>
              </tr>
            ) : (
              data.map((appointment, index) => (
                <tr
                  key={appointment._id}
                  className={`border-b hover:bg-blue-50 transition duration-200 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                >

                  {/* Pet Name */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {appointment.petname}
                      </p>

                      <p className="text-sm text-gray-500">
                        Veterinary Appointment
                      </p>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-gray-600">
                    {new Date(
                      appointment.date
                    ).toLocaleDateString()}
                  </td>

                  {/* Time */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="text-blue-500" />
                      {appointment.time}
                    </div>
                  </td>

                  {/* Mobile */}
                  <td className="px-6 py-5 text-gray-600">
                    {appointment.mobilenumber}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center items-center gap-3">

                      {appointment.status ===
                        "pending" && (
                        <>
                          <button
                            className="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-xl transition duration-200"
                            onClick={() =>
                              handleEdit(
                                appointment._id,
                                "rejected"
                              )
                            }
                          >
                            <BsFillXSquareFill size={18} />
                          </button>

                          <button
                            className="bg-green-100 hover:bg-green-200 text-green-600 p-3 rounded-xl transition duration-200"
                            onClick={() =>
                              handleEdit(
                                appointment._id,
                                "accepted"
                              )
                            }
                          >
                            <BsCheckSquareFill size={18} />
                          </button>
                        </>
                      )}

                      {appointment.status !==
                        "pending" && (
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-semibold text-white ${
                            appointment.status ===
                            "accepted"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl shadow-xl p-6 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FaCalendarCheck />
                Appointment Management
              </h1>

              <p className="mt-2 text-cyan-100 text-sm">
                Manage all veterinary appointments and schedules.
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search pet appointments..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full sm:w-80 pl-11 pr-4 py-3 rounded-xl border-none outline-none text-gray-700 shadow-lg"
              />

              <FaSearch className="absolute top-4 left-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          {/* Pending */}
          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-yellow-500">
            <h2 className="text-gray-500 text-sm">
              Pending Appointments
            </h2>

            <p className="text-3xl font-bold text-yellow-500 mt-2">
              {pendingAppointments.length}
            </p>
          </div>

          {/* Accepted */}
          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-500">
            <h2 className="text-gray-500 text-sm">
              Accepted Appointments
            </h2>

            <p className="text-3xl font-bold text-green-500 mt-2">
              {acceptedAppointments.length}
            </p>
          </div>

          {/* Rejected */}
          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-red-500">
            <h2 className="text-gray-500 text-sm">
              Rejected Appointments
            </h2>

            <p className="text-3xl font-bold text-red-500 mt-2">
              {rejectedAppointments.length}
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white shadow-2xl rounded-3xl p-6 mb-10">
          
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Appointment Calendar
            </h2>

            <div className="flex gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-cyan-400"></span>
                Pending
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                Accepted
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500"></span>
                Rejected
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 550 }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor:
                    event.status === "accepted"
                      ? "#3B82F6"
                      : event.status === "rejected"
                      ? "#22C55E"
                      : "#06B6D4",
                  color: "white",
                  borderRadius: "10px",
                  border: "none",
                  padding: "4px",
                },
              })}
            />
          </div>
        </div>

        {/* Tables */}
        {renderTable(
          "Pending Appointments",
          pendingAppointments,
          "bg-yellow-500"
        )}

        {renderTable(
          "Accepted Appointments",
          acceptedAppointments,
          "bg-green-500"
        )}

        {renderTable(
          "Rejected Appointments",
          rejectedAppointments,
          "bg-red-500"
        )}
      </div>
    </div>
  );
};

export default AdminAppointmentPage;