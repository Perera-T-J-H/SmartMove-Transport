import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UpdateProfile from './components/UpdateProfile';
import Footer from './components/Footer';

// Passenger-facing
import RoutesPage from './components/RoutesPage';
import BookTripPage from './components/BookTripPage';
import MyTicketsPage from './components/MyTicketsPage';
import LeaveFeedbackPage from './components/LeaveFeedbackPage';
import PaymentPage from './components/PaymentPage';
import ContactPage from './components/ContactPage';

// Driver / Mechanic
import DriverTripsPage from './components/DriverTripsPage';
import MechanicJobsPage from './components/MechanicJobsPage';

// Admin
import AdminDashboardPage from './components/AdminDashboardPage';
import AdminVehiclesPage from './components/AdminVehiclesPage';
import AdminRoutesPage from './components/AdminRoutesPage';
import AdminTripsPage from './components/AdminTripsPage';
import AdminPassengersPage from './components/AdminPassengersPage';
import AdminEmployeesPage from './components/AdminEmployeesPage';
import AdminTicketsPage from './components/AdminTicketsPage';
import AdminPaymentsPage from './components/AdminPaymentsPage';
import AdminMaintenancePage from './components/AdminMaintenancePage';
import AdminFeedbackPage from './components/AdminFeedbackPage';

import './App.css';

function AppLayout({ currentUser, setCurrentUser }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isAdminPath && (
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}

      <div className="flex-grow-1">
        <Routes>
          {/* ================= PUBLIC / PASSENGER ================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/book" element={<BookTripPage />} />
          <Route path="/my-tickets" element={<MyTicketsPage />} />
          <Route path="/feedback" element={<LeaveFeedbackPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-settings" element={
            <UpdateProfile currentUser={currentUser} setCurrentUser={setCurrentUser} />
          } />

          {/* ================= DRIVER / MECHANIC ================= */}
          <Route path="/driver/trips" element={<DriverTripsPage />} />
          <Route path="/mechanic/jobs" element={<MechanicJobsPage />} />

          {/* ================= ADMIN ================= */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/vehicles" element={<AdminVehiclesPage />} />
          <Route path="/admin/routes" element={<AdminRoutesPage />} />
          <Route path="/admin/trips" element={<AdminTripsPage />} />
          <Route path="/admin/passengers" element={<AdminPassengersPage />} />
          <Route path="/admin/employees" element={<AdminEmployeesPage />} />
          <Route path="/admin/tickets" element={<AdminTicketsPage />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
          <Route path="/admin/maintenance" element={<AdminMaintenancePage />} />
          <Route path="/admin/feedback" element={<AdminFeedbackPage />} />
        </Routes>
      </div>

      {!isAdminPath && <Footer />}
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <Router>
      <AppLayout currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </Router>
  );
}

export default App;
