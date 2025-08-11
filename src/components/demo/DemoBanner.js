import React from "react";
import { useSelector } from "react-redux";
import { AlertTriangle, Info } from "lucide-react";

const DemoBanner = () => {
  const { isDemoMode } = useSelector((state) => state.auth);

  if (!isDemoMode) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-white" />
          <div>
            <span className="font-semibold">Demo Mode Active</span>
            <span className="ml-2 text-sm opacity-90">
              You're viewing sample data. All changes are temporary and will be
              reset.
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Info className="h-4 w-4" />
          <span>Use demo@school.com / demo123 to login</span>
        </div>
      </div>
    </div>
  );
};

export default DemoBanner;
