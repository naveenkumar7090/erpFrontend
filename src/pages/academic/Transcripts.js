import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Eye,
  Printer,
} from "lucide-react";
import { format } from "date-fns";

const Transcripts = () => {
  const dispatch = useDispatch();
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTranscript, setEditingTranscript] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    academicYear: "",
    semester: "",
    classId: "",
    totalMarks: "",
    obtainedMarks: "",
    percentage: "",
    grade: "",
    remarks: "",
    isActive: true,
  });

  const classes = useSelector((state) => state.school.classes);

  useEffect(() => {
    fetchTranscripts();
  }, []);

  const fetchTranscripts = async () => {
    setLoading(true);
    try {
      const mockTranscripts = [
        {
          id: 1,
          studentName: "John Doe",
          studentId: "ST001",
          className: "Class 10",
          academicYear: "2023-2024",
          semester: "First Semester",
          totalMarks: "500",
          obtainedMarks: "425",
          percentage: "85.0",
          grade: "A",
          cgpa: "3.8",
          remarks:
            "Excellent performance. Shows great potential in Mathematics and Science.",
          isActive: true,
          lastUpdated: "2024-01-15",
        },
        {
          id: 2,
          studentName: "Jane Smith",
          studentId: "ST002",
          className: "Class 9",
          academicYear: "2023-2024",
          semester: "First Semester",
          totalMarks: "500",
          obtainedMarks: "380",
          percentage: "76.0",
          grade: "B+",
          cgpa: "3.2",
          remarks: "Good performance. Needs improvement in Mathematics.",
          isActive: true,
          lastUpdated: "2024-01-15",
        },
      ];
      setTranscripts(mockTranscripts);
    } catch (error) {
      toast.error("Failed to fetch transcripts");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTranscript) {
        const updatedTranscripts = transcripts.map((transcript) =>
          transcript.id === editingTranscript.id
            ? { ...transcript, ...formData }
            : transcript
        );
        setTranscripts(updatedTranscripts);
        toast.success("Transcript updated successfully");
      } else {
        const newTranscript = {
          id: Date.now(),
          ...formData,
          className: classes.find((c) => c.id === formData.classId)?.name || "",
          studentName: "New Student",
          cgpa: "0.0",
          lastUpdated: new Date().toISOString().split("T")[0],
        };
        setTranscripts([...transcripts, newTranscript]);
        toast.success("Transcript created successfully");
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save transcript");
    }
  };

  const handleEdit = (transcript) => {
    setEditingTranscript(transcript);
    setFormData({
      studentId: transcript.studentId,
      academicYear: transcript.academicYear,
      semester: transcript.semester,
      classId: classes.find((c) => c.name === transcript.className)?.id || "",
      totalMarks: transcript.totalMarks,
      obtainedMarks: transcript.obtainedMarks,
      percentage: transcript.percentage,
      grade: transcript.grade,
      remarks: transcript.remarks,
      isActive: transcript.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (transcriptId) => {
    if (window.confirm("Are you sure you want to delete this transcript?")) {
      try {
        setTranscripts(
          transcripts.filter((transcript) => transcript.id !== transcriptId)
        );
        toast.success("Transcript deleted successfully");
      } catch (error) {
        toast.error("Failed to delete transcript");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: "",
      academicYear: "",
      semester: "",
      classId: "",
      totalMarks: "",
      obtainedMarks: "",
      percentage: "",
      grade: "",
      remarks: "",
      isActive: true,
    });
    setEditingTranscript(null);
  };

  const filteredTranscripts = transcripts.filter((transcript) => {
    const matchesSearch =
      transcript.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transcript.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !filterClass || transcript.className === filterClass;
    const matchesYear = !filterYear || transcript.academicYear === filterYear;
    return matchesSearch && matchesClass && matchesYear;
  });

  const getGradeColor = (grade) => {
    if (grade.includes("A+")) return "text-green-600 bg-green-100";
    if (grade.includes("A")) return "text-blue-600 bg-blue-100";
    if (grade.includes("B+")) return "text-yellow-600 bg-yellow-100";
    if (grade.includes("B")) return "text-orange-600 bg-orange-100";
    if (grade.includes("C")) return "text-red-600 bg-red-100";
    return "text-gray-600 bg-gray-100";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Transcripts Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage student academic records, grades, and generate transcripts
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add New Transcript
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </select>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Years</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
          </select>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Filter size={20} />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Transcripts Table */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTranscripts.map((transcript) => (
                  <tr key={transcript.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {transcript.studentName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transcript.studentId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transcript.className}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transcript.semester}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transcript.obtainedMarks}/{transcript.totalMarks}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transcript.percentage}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(
                          transcript.grade
                        )}`}
                      >
                        {transcript.grade}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        CGPA: {transcript.cgpa}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(transcript)}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(transcript.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Transcript Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingTranscript ? "Edit Transcript" : "Add New Transcript"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year
                  </label>
                  <select
                    required
                    value={formData.academicYear}
                    onChange={(e) =>
                      setFormData({ ...formData, academicYear: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>
                  <select
                    required
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({ ...formData, semester: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Semester</option>
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <select
                    required
                    value={formData.classId}
                    onChange={(e) =>
                      setFormData({ ...formData, classId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.totalMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, totalMarks: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Obtained Marks
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.obtainedMarks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        obtainedMarks: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade
                  </label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {editingTranscript
                    ? "Update Transcript"
                    : "Create Transcript"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transcripts;
