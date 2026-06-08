import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Doctors from "../pages/Doctor";
import DoctorProfile from "../pages/DoctorProfile";
import PatientDashboard from "../pages/PatientDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import DoctorDashboard from "../pages/DoctorDashboard";
import BookingPage from "../pages/BookingPage";
import DoctorAvailability from "../pages/DoctorAvailabilty";
import DoctorAppointments from "../pages/DoctorAppointments";
import ProfileDoctor from "../pages/ProfileDoctor";
import DoctorLayout from "../layouts/DoctorLayout";
import PatientProfile from "../pages/PatientProfile";
import HomeLayout from "../layouts/HomeLayout";
import PatientHistory from "../pages/PatientHistory";
import AppointmentDetails from "../pages/AppointmentDetails";
import PrescriptionPage from "../pages/PrescriptionPage";
import PatientPrescription from "../pages/PatientPrescription";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import PendingDoctors from "../pages/PendingDoctors";
import AdminDoctorProfile from "../pages/AdminDoctorProfile";
import ApprovedDoctors from "../pages/ApprovedDoctor";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Pages WITH Navbar */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
  
      </Route>
      <Route element={<MainLayout />}>
        
        <Route path="/patient/doctors" element={<Doctors />} />
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
          <Route element={<DoctorLayout/>}>
          <Route path="/doctor" element={<ProtectedRoute role="doctor"><DoctorDashboard/></ProtectedRoute>}/></Route>
      {/* ❌ Pages WITHOUT Navbar (auth pages) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/doctors/:id" element={<DoctorProfile />} />
      <Route path="/patient/profile" element={<PatientProfile/> } />
      <Route path="/book/:id" element={<BookingPage />} />
      <Route path='/doctor/availability' element={<ProtectedRoute role="doctor"><DoctorAvailability/></ProtectedRoute>}/>
      <Route path='/doctor/appointments' element={<ProtectedRoute role="doctor"><DoctorAppointments/></ProtectedRoute>}/>
      <Route path='/doctor/profile' element={<ProtectedRoute role="doctor"><ProfileDoctor/></ProtectedRoute>}/>
      <Route path='/patient/history' element={<ProtectedRoute role="patient"><PatientHistory/></ProtectedRoute>}/>
      <Route path='/patient/history/:id' element={<ProtectedRoute role="patient"><AppointmentDetails/></ProtectedRoute>}/>
      <Route path='/doctor/:id/prescription' element={<ProtectedRoute role="doctor"><PrescriptionPage/></ProtectedRoute>}/>
      <Route path='/patient/prescription/:id' element={<ProtectedRoute role="patient"><PatientPrescription/></ProtectedRoute>}/>
     <Route element={<AdminLayout/>}>
      <Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route path="/admin/pending-doctors" element={<ProtectedRoute role="admin"><PendingDoctors/></ProtectedRoute>}/>
<Route path="/admin/doctors/:id" element={<ProtectedRoute role="admin"><AdminDoctorProfile/></ProtectedRoute>}/>
<Route path="/admin/doctors" element={<ProtectedRoute role="admin"><ApprovedDoctors/></ProtectedRoute>}/>
</Route>
    </Routes>
  );
};

export default AppRoutes;