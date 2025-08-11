import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Filter,
  Search,
  Plus,
} from "lucide-react";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("daily"); // daily, monthly, student

  // Sample data - replace with API calls
  useEffect(() => {
    const sampleClasses = [
      { id: 1, name: "Class 10A", grade: "10", section: "A" },
      { id: 2, name: "Class 9B", grade: "9", section: "B" },
      { id: 3, name: "Class 11C", grade: "11", section: "C" },
    ];
    setClasses(sampleClasses);

    if (selectedClass) {
      loadAttendanceData();
    }
  }, [selectedClass, selectedDate]);

  const loadAttendanceData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const sampleAttendance = [
        {
          id: 1,
          studentId: "ST001",
          studentName: "John Doe",
          status: "present",
          timeIn: "08:15",
          timeOut: "15:30",
          remarks: "",
        },
        {
          id: 2,
          studentId: "ST002",
          studentName: "Jane Smith",
          status: "absent",
          timeIn: "",
          timeOut: "",
          remarks: "Sick leave",
        },
        {
          id: 3,
          studentId: "ST003",
          studentName: "Mike Johnson",
          status: "late",
          timeIn: "08:45",
          timeOut: "15:30",
          remarks: "Traffic delay",
        },
        {
          id: 4,
          studentId: "ST004",
          studentName: "Sarah Wilson",
          status: "present",
          timeIn: "08:00",
          timeOut: "15:30",
          remarks: "",
        },
        {
          id: 5,
          studentId: "ST005",
          studentName: "David Brown",
          status: "present",
          timeIn: "08:10",
          timeOut: "15:30",
          remarks: "",
        },
      ];
      setAttendanceData(sampleAttendance);
      setIsLoading(false);
    }, 1000);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const handleBulkAction = (action) => {
    if (action === "markAllPresent") {
      setAttendanceData((prev) =>
        prev.map((student) => ({ ...student, status: "present" }))
      );
    } else if (action === "markAllAbsent") {
      setAttendanceData((prev) =>
        prev.map((student) => ({ ...student, status: "absent" }))
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200";
      case "absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "late":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4" />;
      case "absent":
        return <XCircle className="w-4 h-4" />;
      case "late":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getAttendanceStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter((s) => s.status === "present").length;
    const absent = attendanceData.filter((s) => s.status === "absent").length;
    const late = attendanceData.filter((s) => s.status === "late").length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, late, percentage };
  };

  const stats = getAttendanceStats();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Attendance Management
        </h1>
        <p className="text-gray-600">
          Track daily student attendance and manage records
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Mode
            </label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="daily">Daily View</option>
              <option value="monthly">Monthly View</option>
              <option value="student">Student View</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={loadAttendanceData}
              disabled={!selectedClass}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Load Attendance
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {attendanceData.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleBulkAction("markAllPresent")}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
            >
              Mark All Present
            </button>
            <button
              onClick={() => handleBulkAction("markAllAbsent")}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
            >
              Mark All Absent
            </button>
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm">
              <Download className="w-4 h-4 inline mr-1" />
              Export
            </button>
          </div>
        )}
      </div>

      {/* Statistics */}
      {attendanceData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Present</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.present}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.absent}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Attendance Rate
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.percentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendance data...</p>
        </div>
      ) : attendanceData.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {student.studentName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.studentId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          student.status
                        )}`}
                      >
                        {getStatusIcon(student.status)}
                        <span className="ml-1 capitalize">
                          {student.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.timeIn || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.timeOut || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={student.remarks}
                        onChange={(e) => {
                          setAttendanceData((prev) =>
                            prev.map((s) =>
                              s.id === student.id
                                ? { ...s, remarks: e.target.value }
                                : s
                            )
                          );
                        }}
                        placeholder="Add remarks..."
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(student.id, "present")
                          }
                          className={`px-2 py-1 rounded text-xs ${
                            student.status === "present"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-800"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(student.id, "absent")
                          }
                          className={`px-2 py-1 rounded text-xs ${
                            student.status === "absent"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-800"
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, "late")}
                          className={`px-2 py-1 rounded text-xs ${
                            student.status === "late"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-800"
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : selectedClass ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No attendance data
          </h3>
          <p className="text-gray-600">
            No attendance records found for the selected date and class.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select Class and Date
          </h3>
          <p className="text-gray-600">
            Choose a class and date to view attendance records.
          </p>
        </div>
      )}

      {/* Save Button */}
      {attendanceData.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Save Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;
