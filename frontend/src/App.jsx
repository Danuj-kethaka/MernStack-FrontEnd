import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/AboutPage.jsx";
import { Toaster } from "react-hot-toast";
import PetPage from "./pages/PetPage.jsx";
import Contact from "./pages/ContactUsPage.jsx";
import Services from "./pages/ServicePage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import SignUpPage from "./pages/Auth/SignUpPage.jsx";
import UserSideBar from "./components/UserSideBar.jsx";
import AdminSideBar from "./components/AdminSideBar.jsx";
import AddPetAdoption from "./components/AddPetAdoption.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import AdminAccount from "./pages/AdminAccount/Admin.DashBoard.jsx";
import UserPage from "./pages/AdminAccount/AdminPages/User.Page.jsx";
import AdminDashBoard from "./pages/AdminAccount/Admin.DashBoard.jsx";
import PetDetailsPage from "./pages/UserAccount/PetDetails/PetDetails.jsx";
import AppointmentPage from "./pages/UserAccount/Appointment/Appointment.jsx";
import AdminPetProfile from "./pages/AdminAccount/AdminPages/PetProfile.Page.jsx"
import AdminAdoptionPage from "./pages/AdminAccount/AdminPages/Adoption.Page.jsx";
import AccountDetails from "./pages/UserAccount/AccountDetails/AccountDetails.jsx"
import EditAccount from "./pages/UserAccount/Edit Account Details/EditAccount.jsx";
import AdminAppointmentPage from "./pages/AdminAccount/AdminPages/Appointment.Page.jsx";


function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  const hideNavbarRoutes = [
    "/UserSideBar",
    "/AdminAccount",
    "/AdminAccount/users",
    "/AdminAccount/AdminAppointment",
    "/AdminAccount/AddPetAdoption",
    "/AdminAccount/AdminPetProfile",
    "/AdminAccount/AdminAdoption",
    "/UserAppointment",
    "/CreateAppointment",
    "/UserSideBar/UserAccount",
    "/UserSideBar/EditAccount",
    "/UserSideBar/AccountDetails",
    "/UserSideBar/UserAppointment",
    "/UserSideBar/PetDetails",
  ];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/UserSideBar" element={<UserSideBar />} />
        <Route path="/AdminAccount" element={<AdminDashBoard />} />
        <Route path="/UserAppointment" element={<AppointmentPage />} />
        <Route path="/PetPage" element={<PetPage />} />

        <Route path="/AdminAccount" element={<AdminSideBar />}>
          <Route index element={<AdminDashBoard />} />
          <Route path="users" element={<UserPage />} />
          <Route path="AdminAppointment" element={<AdminAppointmentPage/>}/>
          <Route path="AdminPetProfile" element={<AdminPetProfile/>}/>
          <Route path="AdminAdoption" element={<AdminAdoptionPage/>}/>
          <Route path="AddPetAdoption" element={<AddPetAdoption />} />
        </Route>

        <Route path="/UserSideBar" element={<UserSideBar/>}>
          <Route index element={<AccountDetails/>}/>
          <Route path="AccountDetails" element={<AccountDetails />} />
          <Route path="EditAccount" element={<EditAccount />} />
          <Route path="UserAppointment" element={<AppointmentPage />} />
          <Route path="PetDetails" element={<PetDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
