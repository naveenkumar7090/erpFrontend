import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MapPin,
  Users,
  Monitor,
  Wifi,
  AirVent,
} from "lucide-react";

const Classrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBuilding, setFilterBuilding] = useState("");
  const [filterCapacity, setFilterCapacity] = useState("");

  // Sample data - replace with API calls
  useEffect(() => {
    const sampleClassrooms = [
      {
        id: 1,
        name: "Room 101",
        building: "Main Building",
        floor: "1st Floor",
        capacity: 35,
        currentStudents: 32,
        teacher: "Mrs. Sarah Johnson",
        subject: "Mathematics",
        equipment: ["Projector", "Whiteboard", "Computers"],
        facilities: ["Air Conditioning", "WiFi", "Smart Board"],
        status: "Occupied",
        schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
      },
      {
        id: 2,
        name: "Room 102",
        building: "Main Building",
        floor: "1st Floor",
        capacity: 30,
        currentStudents: 0,
        teacher: "",
        subject: "",
        equipment: ["Whiteboard", "Projector"],
        facilities: ["Air Conditioning", "WiFi"],
        status: "Available",
        schedule: "",
      },
      {
        id: 3,
        name: "Lab A",
        building: "Science Building",
        floor: "2nd Floor",
        capacity: 25,
        currentStudents: 20,
        teacher: "Dr. Emily Brown",
        subject: "Physics Lab",
        equipment: ["Lab Equipment", "Computers", "Projector"],
        facilities: ["Air Conditioning", "WiFi", "Safety Equipment"],
        status: "Occupied",
        schedule: "Tue, Thu - 10:30 AM",
      },
      {
        id: 4,
        name: "Computer Lab 1",
        building: "Technology Building",
        floor: "1st Floor",
        capacity: 30,
        currentStudents: 25,
        teacher: "Prof. Michael Wilson",
        subject: "Computer Science",
        equipment: ["Computers", "Projector", "Whiteboard"],
        facilities: ["Air Conditioning", "WiFi", "Network Access"],
        status: "Occupied",
        schedule: "Mon, Wed, Fri - 1:00 PM",
      },
    ];
    setClassrooms(sampleClassrooms);
  }, []);

  const filteredClassrooms = classrooms.filter((classroom) => {
    const matchesSearch =
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding =
      filterBuilding === "" || classroom.building === filterBuilding;
    const matchesCapacity =
      filterCapacity === "" ||
      (filterCapacity === "small" && classroom.capacity <= 25) ||
      (filterCapacity === "medium" &&
        classroom.capacity > 25 &&
        classroom.capacity <= 35) ||
      (filterCapacity === "large" && classroom.capacity > 35);
    return matchesSearch && matchesBuilding && matchesCapacity;
  });

  const handleAddClassroom = () => {
    setEditingClassroom(null);
    setIsModalOpen(true);
  };

  const handleEditClassroom = (classroom) => {
    setEditingClassroom(classroom);
    setIsModalOpen(true);
  };

  const handleDeleteClassroom = (id) => {
    if (window.confirm("Are you sure you want to delete this classroom?")) {
      setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
    }
  };

  const handleSaveClassroom = (classroomData) => {
    if (editingClassroom) {
      setClassrooms(
        classrooms.map((classroom) =>
          classroom.id === editingClassroom.id
            ? { ...classroomData, id: classroom.id }
            : classroom
        )
      );
    } else {
      setClassrooms([...classrooms, { ...classroomData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingClassroom(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Occupied":
        return "bg-red-100 text-red-800";
      case "Available":
        return "bg-green-100 text-green-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Classroom Management
        </h1>
        <p className="text-gray-600">
          Manage school classrooms, facilities, and scheduling
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Classrooms
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {classrooms.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-semibold text-gray-900">
                {classrooms.filter((c) => c.status === "Available").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Users className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupied</p>
              <p className="text-2xl font-semibold text-gray-900">
                {classrooms.filter((c) => c.status === "Occupied").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Monitor className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Capacity
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {classrooms.reduce((sum, c) => sum + c.capacity, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search classrooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterBuilding}
                onChange={(e) => setFilterBuilding(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Buildings</option>
                <option value="Main Building">Main Building</option>
                <option value="Science Building">Science Building</option>
                <option value="Technology Building">Technology Building</option>
              </select>
              <select
                value={filterCapacity}
                onChange={(e) => setFilterCapacity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Sizes</option>
                <option value="small">Small (&le;25)</option>
                <option value="medium">Medium (26-35)</option>
                <option value="large">Large (&gt;35)</option>
              </select>
            </div>
            <button
              onClick={handleAddClassroom}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Classroom
            </button>
          </div>
        </div>

        {/* Classrooms Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Classroom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Use
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facilities
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClassrooms.map((classroom) => (
                <tr key={classroom.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {classroom.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {classroom.building}
                      </div>
                      <div className="text-xs text-gray-400">
                        {classroom.floor}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {classroom.building}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {classroom.currentStudents}/{classroom.capacity}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (classroom.currentStudents / classroom.capacity) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        classroom.status
                      )}`}
                    >
                      {classroom.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        {classroom.teacher || "Not assigned"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {classroom.subject || "No subject"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {classroom.facilities
                        .slice(0, 2)
                        .map((facility, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                          >
                            {facility === "WiFi" && (
                              <Wifi className="h-3 w-3 mr-1" />
                            )}
                            {facility === "Air Conditioning" && (
                              <AirVent className="h-3 w-3 mr-1" />
                            )}
                            {facility}
                          </span>
                        ))}
                      {classroom.facilities.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                          +{classroom.facilities.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClassroom(classroom)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClassroom(classroom.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Classroom Modal */}
      {isModalOpen && (
        <ClassroomModal
          classroomData={editingClassroom}
          onSave={handleSaveClassroom}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const ClassroomModal = ({ classroomData, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    classroomData || {
      name: "",
      building: "",
      floor: "",
      capacity: "",
      teacher: "",
      subject: "",
      equipment: [],
      facilities: [],
      status: "Available",
      schedule: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacilityChange = (facility, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, facility],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        facilities: prev.facilities.filter((f) => f !== facility),
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {classroomData ? "Edit Classroom" : "Add New Classroom"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Classroom Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Building
                </label>
                <select
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Building</option>
                  <option value="Main Building">Main Building</option>
                  <option value="Science Building">Science Building</option>
                  <option value="Technology Building">
                    Technology Building
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Floor
                </label>
                <input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="e.g., 1st Floor"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                max="100"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teacher (if assigned)
              </label>
              <input
                type="text"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject (if assigned)
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facilities
              </label>
              <div className="mt-2 space-y-2">
                {[
                  "WiFi",
                  "Air Conditioning",
                  "Smart Board",
                  "Projector",
                  "Computers",
                ].map((facility) => (
                  <label key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.facilities.includes(facility)}
                      onChange={(e) =>
                        handleFacilityChange(facility, e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {facility}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {classroomData ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Classrooms;
