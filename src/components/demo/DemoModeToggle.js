import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enableDemoMode, disableDemoMode } from "../../store/slices/authSlice";
import { Play, Power, Info } from "lucide-react";

const DemoModeToggle = () => {
  const dispatch = useDispatch();
  const { isDemoMode, isAuthenticated } = useSelector((state) => state.auth);
  const [showInfo, setShowInfo] = useState(false);

  const handleEnableDemo = async () => {
    try {
      await dispatch(enableDemoMode()).unwrap();
      // Redirect to dashboard after enabling demo mode
      window.location.href = "/app/dashboard";
    } catch (error) {
      console.error("Failed to enable demo mode:", error);
    }
  };

  const handleDisableDemo = async () => {
    try {
      await dispatch(disableDemoMode()).unwrap();
      // Redirect to login after disabling demo mode
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to disable demo mode:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 shadow-lg text-white max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Demo Mode</h3>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <Info size={20} />
            </button>
          </div>

          {showInfo && (
            <div className="mb-3 text-sm text-blue-100">
              <p className="mb-2">
                Experience the full application with demo data:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Full access to all features</li>
                <li>Sample data for classes, students, fees</li>
                <li>No API calls required</li>
                <li>Perfect for testing and demonstration</li>
              </ul>
            </div>
          )}

          <button
            onClick={handleEnableDemo}
            className="w-full bg-white text-blue-600 py-2 px-4 rounded-md font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Play size={16} />
            Enable Demo Mode
          </button>

          <div className="mt-2 text-xs text-blue-200 text-center">
            Use: demo@school.com / demo123
          </div>
        </div>
      </div>
    );
  }

  if (isDemoMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 shadow-lg text-white max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Demo Mode Active</h3>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>

          <p className="text-sm text-green-100 mb-3">
            You're currently using demo mode with full access to all features.
          </p>

          <button
            onClick={handleDisableDemo}
            className="w-full bg-white text-green-600 py-2 px-4 rounded-md font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
          >
            <Power size={16} />
            Exit Demo Mode
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default DemoModeToggle;
