import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-32 w-32 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="h-16 w-16 text-red-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="space-y-4">
            <Link
              to="/app/dashboard"
              className="btn btn-primary w-full flex items-center justify-center"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn btn-outline w-full flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or try these options
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              to="/login"
              className="block text-center text-primary-600 hover:text-primary-500 font-medium"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="block text-center text-primary-600 hover:text-primary-500 font-medium"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2024 School ERP System. All rights reserved.</p>
          <p className="mt-1">
            If you believe this is an error, please contact{" "}
            <a
              href="mailto:support@schoolerp.com"
              className="text-primary-600 hover:text-primary-500"
            >
              support@schoolerp.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
