import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  DollarSign,
  MessageSquare,
  Library,
  Truck,
  BarChart3,
  Settings,
  GraduationCap,
  Calendar,
  FileText,
  CreditCard,
  Bell,
  Book,
  Route,
  PieChart,
  Shield,
  X,
  LogOut,
} from "lucide-react";

const Sidebar = ({
  isOpen,
  onClose,
  user,
  onLogout,
  minimized,
  onMinimizeClick,
}) => {
  const location = useLocation();
  const sidebarRef = useRef(null);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const navigation = [
    {
      name: "Dashboard",
      href: "/app/dashboard",
      icon: Home,
      current: location.pathname === "/app/dashboard",
    },
    {
      name: "School Management",
      href: "/app/school",
      icon: GraduationCap,
      current: location.pathname.startsWith("/app/school"),
      children: [
        { name: "Classes", href: "/app/school/classes", icon: BookOpen },
        { name: "Sections", href: "/app/school/sections", icon: Users },
        { name: "Subjects", href: "/app/school/subjects", icon: FileText },
        { name: "Classrooms", href: "/app/school/classrooms", icon: BookOpen },
        { name: "Campuses", href: "/app/school/campuses", icon: GraduationCap },
        { name: "Timetable", href: "/app/school/timetable", icon: Calendar },
      ],
    },
    {
      name: "Academic",
      href: "/app/academic",
      icon: BookOpen,
      current: location.pathname.startsWith("/app/academic"),
      children: [
        {
          name: "Attendance",
          href: "/app/academic/attendance",
          icon: Calendar,
        },
        { name: "Exams", href: "/app/academic/exams", icon: FileText },
        {
          name: "Assignments",
          href: "/app/academic/assignments",
          icon: BookOpen,
        },
        {
          name: "Transcripts",
          href: "/app/academic/transcripts",
          icon: FileText,
        },
      ],
    },
    {
      name: "Finance",
      href: "/app/finance",
      icon: DollarSign,
      current: location.pathname.startsWith("/app/finance"),
      children: [
        { name: "Fees", href: "/app/finance/fees", icon: CreditCard },
        { name: "Invoices", href: "/app/finance/invoices", icon: FileText },
        { name: "Payments", href: "/app/finance/payments", icon: DollarSign },
        { name: "Receipts", href: "/app/finance/receipts", icon: FileText },
      ],
    },
    {
      name: "Communication",
      href: "/app/communication",
      icon: MessageSquare,
      current: location.pathname.startsWith("/app/communication"),
      children: [
        {
          name: "Announcements",
          href: "/app/communication/announcements",
          icon: Bell,
        },
        {
          name: "Emails",
          href: "/app/communication/emails",
          icon: MessageSquare,
        },
        { name: "SMS", href: "/app/communication/sms", icon: Bell },
        {
          name: "Parent Portal",
          href: "/app/communication/parent-portal",
          icon: Users,
        },
      ],
    },
    {
      name: "Library",
      href: "/app/library",
      icon: Library,
      current: location.pathname.startsWith("/app/library"),
      children: [
        { name: "Catalog", href: "/app/library/catalog", icon: Book },
        { name: "Borrowing", href: "/app/library/borrowing", icon: BookOpen },
        { name: "Returns", href: "/app/library/returns", icon: Book },
        { name: "Fines", href: "/app/library/fines", icon: DollarSign },
      ],
    },
    {
      name: "Transport",
      href: "/app/transport",
      icon: Truck,
      current: location.pathname.startsWith("/app/transport"),
      children: [
        { name: "Routes", href: "/app/transport/routes", icon: Route },
        { name: "Vehicles", href: "/app/transport/vehicles", icon: Truck },
        { name: "Stops", href: "/app/transport/stops", icon: Route },
      ],
    },
    {
      name: "Reports",
      href: "/app/reports",
      icon: BarChart3,
      current: location.pathname.startsWith("/app/reports"),
      children: [
        { name: "Attendance", href: "/app/reports/attendance", icon: Calendar },
        { name: "Finance", href: "/app/reports/finance", icon: PieChart },
        { name: "Academic", href: "/app/reports/academic", icon: BarChart3 },
      ],
    },
    {
      name: "Admin",
      href: "/app/admin",
      icon: Settings,
      current: location.pathname.startsWith("/app/admin"),
      children: [
        { name: "Roles", href: "/app/admin/roles", icon: Shield },
        { name: "Settings", href: "/app/admin/settings", icon: Settings },
        {
          name: "Import/Export",
          href: "/app/admin/import-export",
          icon: FileText,
        },
      ],
    },
  ];

  const renderNavItem = (item) => {
    const Icon = item.icon;
    const isActive = item.current;

    return (
      <div key={item.name}>
        <NavLink
          to={item.href}
          onClick={onClose}
          className={`
            group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
            ${minimized ? "justify-center" : ""}
            ${
              isActive
                ? "bg-primary-100 text-primary-900 border-r-2 border-primary-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }
          `}
          title={minimized ? item.name : undefined}
        >
          <Icon
            className={`
              ${
                minimized ? "h-5 w-5" : "mr-3 h-5 w-5"
              } flex-shrink-0 transition-colors
              ${
                isActive
                  ? "text-primary-600"
                  : "text-gray-400 group-hover:text-gray-500"
              }
            `}
          />
          {!minimized && item.name}
        </NavLink>

        {/* Render children if they exist */}
        {item.children && isActive && !minimized && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children.map((child) => {
              const ChildIcon = child.icon;
              const isChildActive = location.pathname === child.href;

              return (
                <NavLink
                  key={child.name}
                  to={child.href}
                  onClick={onClose}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${
                      isChildActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }
                  `}
                >
                  <ChildIcon
                    className={`
                      mr-3 h-4 w-4 flex-shrink-0 transition-colors
                      ${
                        isChildActive
                          ? "text-primary-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      }
                    `}
                  />
                  {child.name}
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <button
              onClick={onMinimizeClick}
              className="flex items-center hover:bg-gray-50 rounded-lg p-1 transition-colors"
              title={minimized ? "Expand sidebar" : "Minimize sidebar"}
            >
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">
                School ERP
              </span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav
            className={`flex-1 space-y-1 py-4 overflow-y-auto ${
              minimized ? "px-2" : "px-2"
            }`}
          >
            {navigation.map(renderNavItem)}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {user?.firstName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {user?.firstName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || "User"}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="mt-3 w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ${
          minimized ? "lg:w-16" : "lg:w-64"
        }`}
      >
        <div className="flex flex-col flex-grow bg-white shadow-lg border-r border-gray-200">
          {/* Logo */}
          <div
            className={`flex h-16 items-center border-b border-gray-200 ${
              minimized ? "justify-center px-2" : "px-4"
            }`}
          >
            <button
              onClick={onMinimizeClick}
              className="flex items-center hover:bg-gray-50 rounded-lg p-1 transition-colors"
              title={minimized ? "Expand sidebar" : "Minimize sidebar"}
            >
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              {!minimized && (
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  School ERP
                </span>
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigation.map(renderNavItem)}
          </nav>

          {/* User section */}
          <div
            className={`border-t border-gray-200 ${minimized ? "p-2" : "p-4"}`}
          >
            <div
              className={`flex items-center ${
                minimized ? "justify-center" : ""
              }`}
            >
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {user?.firstName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </span>
              </div>
              {!minimized && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : user?.email}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role || "User"}
                  </p>
                </div>
              )}
            </div>
            {!minimized && (
              <button
                onClick={onLogout}
                className="mt-3 w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
