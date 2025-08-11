import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enableDemoMode } from "../../store/slices/authSlice";
import {
  Play,
  School,
  Users,
  BookOpen,
  DollarSign,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";

const DemoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await dispatch(enableDemoMode()).unwrap();
      navigate("/app/dashboard");
    } catch (error) {
      console.error("Failed to enable demo mode:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <School className="h-6 w-6" />,
      title: "School Management",
      description: "Manage classes, sections, subjects, and classrooms",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Student & Teacher Management",
      description: "Handle student enrollments and teacher assignments",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Academic Management",
      description: "Track attendance, exams, assignments, and transcripts",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Finance Management",
      description: "Manage fees, payments, and financial records",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Communication",
      description: "Send announcements and notifications",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Role-Based Access",
      description: "Different permission levels for various user roles",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <School className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            School Management System
          </h1>
          <p className="text-xl text-gray-600">
            Experience the full application with demo data
          </p>
        </div>

        {/* Demo Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Demo Mode</h2>
            <p className="text-blue-100">
              Get instant access to all features without any setup or API calls
            </p>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-4">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                One-Click Access
              </h3>
              <p className="text-gray-600">
                Click the button below to instantly enable demo mode and explore
                all features
              </p>
            </div>

            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Enabling Demo Mode...
                </>
              ) : (
                <>
                  <Play className="h-6 w-6" />
                  Start Demo Mode
                </>
              )}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Demo credentials:{" "}
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  demo@school.com
                </span>{" "}
                /{" "}
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  demo123
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              What You'll Get
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Full access to all application features and modules</li>
              <li>
                • Sample data for classes, students, teachers, fees, and more
              </li>
              <li>• No API calls or backend setup required</li>
              <li>
                • Perfect for testing, demonstration, and learning purposes
              </li>
              <li>
                • All changes are temporary and will be reset when demo mode is
                disabled
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLogin;
