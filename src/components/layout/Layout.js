import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DemoBanner from "../demo/DemoBanner";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebarMinimized = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Banner */}
      <DemoBanner />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        user={user}
        onLogout={handleLogout}
        minimized={sidebarMinimized}
        onMinimizeClick={toggleSidebarMinimized}
      />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarMinimized ? "lg:pl-16" : "lg:pl-64"
        }`}
      >
        {/* Header */}
        <Header
          onMenuClick={toggleSidebar}
          user={user}
          onLogout={handleLogout}
        />

        {/* Page content */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <span className="hover:text-gray-700">Dashboard</span>
                </li>
                {location.pathname !== "/app/dashboard" && (
                  <>
                    <li>
                      <span className="mx-2">/</span>
                    </li>
                    <li>
                      <span className="text-gray-900 font-medium">
                        {location.pathname.split("/").pop().replace(/-/g, " ")}
                      </span>
                    </li>
                  </>
                )}
              </ol>
            </nav>

            {/* Page content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile menu button */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <button
          onClick={toggleSidebar}
          className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Layout;
