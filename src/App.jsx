import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import Home from "./pages/Customer/Home";
// import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import PublicRoute from "./components/routes/PublicRoute";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import TransferFormPage from "./pages/admin/TransferFormPage";
import AdminHome from "./components/admin/AdminHome";
import DriverList from "./components/admin/DriverList";
import AdminTourPage from "./pages/admin/AdminTourPage";
import About from "./pages/Customer/About";
import ToursAndActivitesPage from "./pages/Customer/ToursAndActivitesPage";
import ToursAndActivitiesDetailPage from "./pages/Customer/ToursAndActivitiesDetailPage";
import Contact from "./pages/Customer/Contact";
import BlogPage from "./pages/Customer/BlogPage";
import TransferMeetPage from "./pages/Customer/TransferMeetPage";
import AgencyLogin from "./components/TravelAgency/AgencyLogin";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import TravelAgencyHomePage from "./pages/TravelAgency/TravelAgencyHomePage";
import TravelAgencyTransferBooking from "./pages/TravelAgency/TravelAgencyTransferBooking";
import TravelAgencyTourBooking from "./pages/TravelAgency/TravelAgencyTourBooking";
import AllRecentTransferActionsPage from "./pages/admin/AllRecentTransferActionsPage";
import AllRecentTourActionsPage from "./pages/admin/AllRecentTourActionsPage";
import BlogDetailPage from "./pages/Customer/BlogDetailPage";
import AdminContactlist from "./pages/admin/AdminContactlist";
import GoogleTranslate from "./components/GoogleTranslate";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tours-activities" element={<ToursAndActivitesPage />} />
            <Route path="/tours-details/:id" element={<ToursAndActivitiesDetailPage />} />
            <Route path="/transfer" element={<TransferMeetPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route path="/transfer-admin" element={<TransferFormPage />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-tour" element={<AdminTourPage />} />
          <Route path='/admin' element={<AdminLoginPage />} />
          <Route path="/driver-list" element={<DriverList />} />
          <Route path="/agency-login" element={<AgencyLogin />} />
          <Route path="/agency-home" element={<TravelAgencyHomePage />} />
          <Route path="/agency-transfer" element={<TravelAgencyTransferBooking />} />
          <Route path="/agency-tour" element={<TravelAgencyTourBooking />} />
          <Route path="/all-recent-transfer" element={<AllRecentTransferActionsPage />} />
          <Route path="/all-recent-tour" element={<AllRecentTourActionsPage />} />
          <Route path="/contact-enquiry" element={<AdminContactlist />} />
                   
        </Routes>
      </ScrollToTop>
    </Router>
  )
}

export default App;
