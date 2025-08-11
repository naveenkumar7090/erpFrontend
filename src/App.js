import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initializeAuth } from "./store/slices/authSlice";
import { fetchUserProfile } from "./store/slices/userSlice";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import DemoLogin from "./pages/auth/DemoLogin";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import DemoModeToggle from "./components/demo/DemoModeToggle";

// School Management Pages
import Classes from "./pages/school/Classes";
import Sections from "./pages/school/Sections";
import Subjects from "./pages/school/Subjects";
import Classrooms from "./pages/school/Classrooms";
import Campuses from "./pages/school/Campuses";

// Academic Management Pages
import Attendance from "./pages/academic/Attendance";
import Exams from "./pages/academic/Exams";
import Assignments from "./pages/academic/Assignments";
import Transcripts from "./pages/academic/Transcripts";

// Finance Management Pages
import Fees from "./pages/finance/Fees";

// Communication Pages
import Announcements from "./pages/communication/Announcements";

function App() {
  const dispatch = useDispatch();
  const { isLoading, token, user } = useSelector((state) => state.auth);

  // Initialize auth state on app startup - only run once
  useEffect(() => {
    console.log("App.js useEffect - initializeApp called");

    const initializeApp = async () => {
      console.log("App.js - starting app initialization");

      // First initialize auth state
      dispatch(initializeAuth());

      // If we have a token but no user data, fetch the user profile
      // Only do this if we're not in demo mode to prevent infinite loops
      if (token && !user && !localStorage.getItem("demoMode")) {
        console.log("App.js - fetching user profile for existing token");
        try {
          await dispatch(fetchUserProfile()).unwrap();
          console.log("App.js - user profile fetched successfully");
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          // If fetching user profile fails, clear the token
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        }
      } else {
        console.log("App.js - skipping user profile fetch:", {
          hasToken: !!token,
          hasUser: !!user,
          isDemoMode: !!localStorage.getItem("demoMode"),
        });
      }

      console.log("App.js - app initialization completed");
    };

    initializeApp();
  }, [dispatch]); // Remove token and user from dependencies to prevent infinite loop

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/demo"
          element={
            <PublicRoute>
              <DemoLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* School Management */}
          <Route path="school/*" element={<SchoolRoutes />} />

          {/* Academic Management */}
          <Route path="academic/*" element={<AcademicRoutes />} />

          {/* Finance Management */}
          <Route path="finance/*" element={<FinanceRoutes />} />

          {/* Communication */}
          <Route path="communication/*" element={<CommunicationRoutes />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Demo Mode Toggle - Always visible */}
      <DemoModeToggle />
    </>
  );
}

// Route Components
const SchoolRoutes = () => (
  <Routes>
    <Route path="classes" element={<Classes />} />
    <Route path="sections" element={<Sections />} />
    <Route path="subjects" element={<Subjects />} />
    <Route path="classrooms" element={<Classrooms />} />
    <Route path="campuses" element={<Campuses />} />
  </Routes>
);

const AcademicRoutes = () => (
  <Routes>
    <Route path="attendance" element={<Attendance />} />
    <Route path="exams" element={<Exams />} />
    <Route path="assignments" element={<Assignments />} />
    <Route path="transcripts" element={<Transcripts />} />
  </Routes>
);

const FinanceRoutes = () => (
  <Routes>
    <Route path="fees" element={<Fees />} />
  </Routes>
);

const CommunicationRoutes = () => (
  <Routes>
    <Route path="announcements" element={<Announcements />} />
  </Routes>
);

export default App;
