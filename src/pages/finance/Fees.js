import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  DollarSign,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
} from "lucide-react";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [viewMode, setViewMode] = useState("all"); // all, pending, paid, overdue

  // Sample data - replace with API calls
  useEffect(() => {
    const sampleFees = [
      {
        id: 1,
        studentId: "ST001",
        studentName: "John Doe",
        className: "Class 10A",
        feeType: "Tuition Fee",
        amount: 500,
        dueDate: "2024-01-15",
        status: "paid",
        paidAmount: 500,
        paidDate: "2024-01-10",
        paymentMethod: "Online",
        receiptNumber: "RCP001",
      },
      {
        id: 2,
        studentId: "ST002",
        studentName: "Jane Smith",
        className: "Class 9B",
        feeType: "Tuition Fee",
        amount: 450,
        dueDate: "2024-01-15",
        status: "pending",
        paidAmount: 0,
        paidDate: null,
        paymentMethod: null,
        receiptNumber: null,
      },
      {
        id: 3,
        studentId: "ST003",
        studentName: "Mike Johnson",
        className: "Class 11C",
        feeType: "Library Fee",
        amount: 50,
        dueDate: "2024-01-10",
        status: "overdue",
        paidAmount: 0,
        paidDate: null,
        paymentMethod: null,
        receiptNumber: null,
      },
      {
        id: 4,
        studentId: "ST004",
        studentName: "Sarah Wilson",
        className: "Class 10A",
        feeType: "Transport Fee",
        amount: 200,
        dueDate: "2024-01-20",
        status: "paid",
        paidAmount: 200,
        paidDate: "2024-01-18",
        paymentMethod: "Cash",
        receiptNumber: "RCP004",
      },
      {
        id: 5,
        studentId: "ST005",
        studentName: "David Brown",
        className: "Class 9B",
        feeType: "Tuition Fee",
        amount: 450,
        dueDate: "2024-01-15",
        status: "pending",
        paidAmount: 0,
        paidDate: null,
        paymentMethod: null,
        receiptNumber: null,
      },
    ];
    setFees(sampleFees);

    const sampleStudents = [
      { id: 1, name: "Class 10A", grade: "10" },
      { id: 2, name: "Class 9B", grade: "9" },
      { id: 3, name: "Class 11C", grade: "11" },
    ];
    setStudents(sampleStudents);
  }, []);

  const filteredFees = fees.filter((fee) => {
    const matchesSearch =
      fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.feeType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "" || fee.status === filterStatus;
    const matchesClass = filterClass === "" || fee.className === filterClass;
    return matchesSearch && matchesStatus && matchesClass;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getFeeStats = () => {
    const total = fees.length;
    const paid = fees.filter((f) => f.status === "paid").length;
    const pending = fees.filter((f) => f.status === "pending").length;
    const overdue = fees.filter((f) => f.status === "overdue").length;
    const totalAmount = fees.reduce((sum, f) => sum + f.amount, 0);
    const collectedAmount = fees.reduce((sum, f) => sum + f.paidAmount, 0);
    const pendingAmount = totalAmount - collectedAmount;

    return {
      total,
      paid,
      pending,
      overdue,
      totalAmount,
      collectedAmount,
      pendingAmount,
    };
  };

  const stats = getFeeStats();

  const handleAddFee = () => {
    setEditingFee(null);
    setIsModalOpen(true);
  };

  const handleEditFee = (fee) => {
    setEditingFee(fee);
    setIsModalOpen(true);
  };

  const handleDeleteFee = (id) => {
    if (window.confirm("Are you sure you want to delete this fee record?")) {
      setFees(fees.filter((fee) => fee.id !== id));
    }
  };

  const handleSaveFee = (feeData) => {
    if (editingFee) {
      setFees(
        fees.map((fee) =>
          fee.id === editingFee.id ? { ...feeData, id: fee.id } : fee
        )
      );
    } else {
      setFees([...fees, { ...feeData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingFee(null);
  };

  const handleMarkAsPaid = (id) => {
    setFees(
      fees.map((fee) =>
        fee.id === id
          ? {
              ...fee,
              status: "paid",
              paidAmount: fee.amount,
              paidDate: new Date().toISOString().split("T")[0],
              paymentMethod: "Manual",
              receiptNumber: `RCP${Date.now()}`,
            }
          : fee
      )
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Fees Management
        </h1>
        <p className="text-gray-600">
          Manage student fees, payments, and financial records
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Fees</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalAmount}
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
              <p className="text-sm font-medium text-gray-600">Collected</p>
              <p className="text-2xl font-bold text-green-600">
                ${stats.collectedAmount}
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
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                ${stats.pendingAmount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleAddFee}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Fee
        </button>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search students or fee types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Classes</option>
            {students.map((cls) => (
              <option key={cls.id} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fees Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {fee.studentName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {fee.studentId}
                      </div>
                      <div className="text-sm text-gray-500">
                        {fee.className}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fee.feeType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${fee.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fee.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        fee.status
                      )}`}
                    >
                      {getStatusIcon(fee.status)}
                      <span className="ml-1 capitalize">{fee.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fee.status === "paid" ? (
                      <div className="text-sm text-gray-900">
                        <div>Paid: ${fee.paidAmount}</div>
                        <div className="text-gray-500">{fee.paidDate}</div>
                        <div className="text-gray-500">{fee.paymentMethod}</div>
                        <div className="text-gray-500">{fee.receiptNumber}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">Not paid</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditFee(fee)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {fee.status !== "paid" && (
                        <button
                          onClick={() => handleMarkAsPaid(fee.id)}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Mark as Paid"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteFee(fee.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredFees.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No fees found
          </h3>
          <p className="text-gray-600">
            {searchTerm || filterStatus || filterClass
              ? "Try adjusting your search or filter criteria"
              : "Get started by adding your first fee record"}
          </p>
        </div>
      )}

      {/* Add/Edit Fee Modal */}
      {isModalOpen && (
        <FeeModal
          feeData={editingFee}
          onSave={handleSaveFee}
          onClose={() => {
            setIsModalOpen(false);
            setEditingFee(null);
          }}
          students={students}
        />
      )}
    </div>
  );
};

// Fee Modal Component
const FeeModal = ({ feeData, onSave, onClose, students }) => {
  const [formData, setFormData] = useState(
    feeData || {
      studentId: "",
      studentName: "",
      className: "",
      feeType: "",
      amount: "",
      dueDate: "",
      status: "pending",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleStudentChange = (studentId) => {
    const student = students.find((s) => s.id === parseInt(studentId));
    if (student) {
      setFormData({
        ...formData,
        studentId: student.id,
        studentName: student.name,
        className: student.name,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">
          {feeData ? "Edit Fee" : "Add New Fee"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student
            </label>
            <select
              value={formData.studentId}
              onChange={(e) => handleStudentChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fee Type
            </label>
            <select
              value={formData.feeType}
              onChange={(e) =>
                setFormData({ ...formData, feeType: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Fee Type</option>
              <option value="Tuition Fee">Tuition Fee</option>
              <option value="Library Fee">Library Fee</option>
              <option value="Transport Fee">Transport Fee</option>
              <option value="Laboratory Fee">Laboratory Fee</option>
              <option value="Sports Fee">Sports Fee</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {feeData ? "Update Fee" : "Create Fee"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Fees;
