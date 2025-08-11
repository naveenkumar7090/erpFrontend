import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MapPin,
  Users,
  Building,
  Phone,
  Mail,
} from "lucide-react";

const Campuses = () => {
  const [campuses, setCampuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampus, setEditingCampus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  // Sample data - replace with API calls
  useEffect(() => {
    const sampleCampuses = [
      {
        id: 1,
        name: "Main Campus",
        type: "Primary",
        address: "123 Education Street, City Center",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        phone: "+1 (555) 123-4567",
        email: "main@school.edu",
        principal: "Dr. John Smith",
        capacity: 1200,
        currentStudents: 1150,
        established: "1995",
        facilities: ["Library", "Gymnasium", "Science Labs", "Computer Labs"],
        status: "Active",
      },
      {
        id: 2,
        name: "North Campus",
        type: "Secondary",
        address: "456 Learning Avenue, North District",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "USA",
        phone: "+1 (555) 234-5678",
        email: "north@school.edu",
        principal: "Mrs. Sarah Johnson",
        capacity: 800,
        currentStudents: 750,
        established: "2005",
        facilities: ["Sports Complex", "Arts Center", "Cafeteria"],
        status: "Active",
      },
      {
        id: 3,
        name: "East Campus",
        type: "Elementary",
        address: "789 Knowledge Road, East Side",
        city: "New York",
        state: "NY",
        zipCode: "10003",
        country: "USA",
        phone: "+1 (555) 345-6789",
        email: "east@school.edu",
        principal: "Mr. David Chen",
        capacity: 500,
        currentStudents: 480,
        established: "2010",
        facilities: ["Playground", "Music Room", "Art Studio"],
        status: "Active",
      },
      {
        id: 4,
        name: "West Campus",
        type: "Primary",
        address: "321 Wisdom Boulevard, West End",
        city: "New York",
        state: "NY",
        zipCode: "10004",
        country: "USA",
        phone: "+1 (555) 456-7890",
        email: "west@school.edu",
        principal: "Dr. Emily Brown",
        capacity: 900,
        currentStudents: 0,
        established: "2015",
        facilities: ["Auditorium", "Swimming Pool", "Tennis Courts"],
        status: "Under Construction",
      },
    ];
    setCampuses(sampleCampuses);
  }, []);

  const filteredCampuses = campuses.filter((campus) => {
    const matchesSearch =
      campus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campus.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campus.principal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || campus.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddCampus = () => {
    setEditingCampus(null);
    setIsModalOpen(true);
  };

  const handleEditCampus = (campus) => {
    setEditingCampus(campus);
    setIsModalOpen(true);
  };

  const handleDeleteCampus = (id) => {
    if (window.confirm("Are you sure you want to delete this campus?")) {
      setCampuses(campuses.filter((campus) => campus.id !== id));
    }
  };

  const handleSaveCampus = (campusData) => {
    if (editingCampus) {
      setCampuses(
        campuses.map((campus) =>
          campus.id === editingCampus.id
            ? { ...campusData, id: campus.id }
            : campus
        )
      );
    } else {
      setCampuses([...campuses, { ...campusData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingCampus(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Under Construction":
        return "bg-yellow-100 text-yellow-800";
      case "Maintenance":
        return "bg-orange-100 text-orange-800";
      case "Closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Campus Management
        </h1>
        <p className="text-gray-600">
          Manage school campuses, locations, and facilities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Campuses
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {campuses.length}
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
              <p className="text-sm font-medium text-gray-600">
                Active Campuses
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {campuses.filter((c) => c.status === "Active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Students
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {campuses.reduce((sum, c) => sum + c.currentStudents, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Building className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Capacity
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {campuses.reduce((sum, c) => sum + c.capacity, 0)}
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
                  placeholder="Search campuses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Elementary">Elementary</option>
                <option value="High School">High School</option>
              </select>
            </div>
            <button
              onClick={handleAddCampus}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Campus
            </button>
          </div>
        </div>

        {/* Campuses Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Principal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampuses.map((campus) => (
                <tr key={campus.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {campus.name}
                      </div>
                      <div className="text-sm text-gray-500">{campus.type}</div>
                      <div className="text-xs text-gray-400">
                        Est. {campus.established}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        {campus.city}, {campus.state}
                      </div>
                      <div className="text-sm text-gray-500">
                        {campus.address}
                      </div>
                      <div className="text-xs text-gray-400">
                        {campus.zipCode}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {campus.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {campus.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campus.principal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {campus.currentStudents}/{campus.capacity}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (campus.currentStudents / campus.capacity) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        campus.status
                      )}`}
                    >
                      {campus.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCampus(campus)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCampus(campus.id)}
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

      {/* Add/Edit Campus Modal */}
      {isModalOpen && (
        <CampusModal
          campusData={editingCampus}
          onSave={handleSaveCampus}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const CampusModal = ({ campusData, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    campusData || {
      name: "",
      type: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
      phone: "",
      email: "",
      principal: "",
      capacity: "",
      established: "",
      facilities: [],
      status: "Active",
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
            {campusData ? "Edit Campus" : "Add New Campus"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Campus Name
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Campus Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Elementary">Elementary</option>
                <option value="High School">High School</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Principal
                </label>
                <input
                  type="text"
                  name="principal"
                  value={formData.principal}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
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
                  max="5000"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Established Year
              </label>
              <input
                type="number"
                name="established"
                value={formData.established}
                onChange={handleChange}
                min="1900"
                max="2030"
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
                <option value="Active">Active</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facilities
              </label>
              <div className="mt-2 space-y-2">
                {[
                  "Library",
                  "Gymnasium",
                  "Science Labs",
                  "Computer Labs",
                  "Sports Complex",
                  "Arts Center",
                  "Cafeteria",
                  "Playground",
                  "Music Room",
                  "Art Studio",
                  "Auditorium",
                  "Swimming Pool",
                  "Tennis Courts",
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
                {campusData ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Campuses;
