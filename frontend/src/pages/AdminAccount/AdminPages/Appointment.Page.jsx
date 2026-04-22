import { BsFillXSquareFill } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import { useAppointmentStore } from "../../../store/Appointment/Appointment.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
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
  const { appointments, fetchAppointments, updateAppointment } = useAppointmentStore();
  const safeAppointments = appointments?.filter(Boolean) || [];
  const [events, setEvents] = useState([]);
  useEffect(() => {fetchAppointments();}, []);
  useEffect(() => {
    const mappedEvents = safeAppointments.map(a => {
      const dateObj = new Date(a.date); 
      const [hours, minutes] = a.time.split(":").map(Number); 
      dateObj.setHours(hours, minutes);
      return {
        id: a._id,
        title: `${a.petname} (${a.status})`,
        start: dateObj,
        end: new Date(dateObj.getTime() + 30 * 60 * 1000),
        status: a.status,
  };});setEvents(mappedEvents);
  }, [appointments]);

  const handleEdit = async (appointmentId, status) => {
    const { success, message } = await updateAppointment(appointmentId, status);
    if (success) toast.success(message);
    else toast.error(message);
  };
  
  const pendingAppointments = safeAppointments.filter(a => a.status === "pending");
  const acceptedAppointments = safeAppointments.filter(a => a.status === "accepted");
  const rejectedAppointments = safeAppointments.filter(a => a.status === "rejected");

  const renderTable = (title, data) => (
    <div className="p-5 bg-white shadow rounded-lg mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner nb</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(appointment => (
              <tr key={appointment._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.petname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(appointment.date).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.mobilenumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  {appointment.status === "pending" && (
                    <>
                      <button
                        className="text-red-600 hover:text-red-900 mr-2"
                        onClick={() => handleEdit(appointment._id, "rejected")}
                      >
                        <BsFillXSquareFill size={20} />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEdit(appointment._id, "accepted")}
                      >
                        <BsCheckSquareFill size={20} />
                      </button>
                    </>
                  )}
                  {appointment.status !== "pending" && (
                    <span className={`px-2 py-1 rounded text-white ${appointment.status === "accepted" ? "bg-green-500" : "bg-red-500"}`}>
                      {appointment.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="mt-20 w-full px-4 sm:px-6 lg:px-8">
      <div className="p-5 bg-white shadow rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Appointments Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={event => ({
            style: {
              backgroundColor:
                event.status === "accepted" ? "#526cf2" :
                event.status === "rejected" ? "#70f067" :
                "#24d3fb",
              color: "white",
            },
          })}
        />
      </div>

      {renderTable("Pending Appointments", pendingAppointments)}
      {renderTable("Accepted Appointments", acceptedAppointments)}
      {renderTable("Rejected Appointments", rejectedAppointments)}
    </div>
  );
};

export default AdminAppointmentPage;