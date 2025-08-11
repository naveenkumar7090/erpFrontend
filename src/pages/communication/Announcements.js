import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Bell,
  Calendar,
  Users,
  Eye,
  Clock,
  Send,
  Target,
  FileText,
} from "lucide-react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAudience, setFilterAudience] = useState("");
  const [viewMode, setViewMode] = useState("all"); // all, scheduled, sent, draft

  // Sample data - replace with API calls
  useEffect(() => {
    const sampleAnnouncements = [
      {
        id: 1,
        title: "Parent-Teacher Meeting",
        content:
          "Annual parent-teacher meeting will be held on January 25th, 2024. All parents are requested to attend.",
        audience: "parents",
        priority: "high",
        status: "scheduled",
        scheduledDate: "2024-01-20T10:00",
        sentDate: null,
        createdBy: "Admin",
        createdAt: "2024-01-15T09:00",
        attachments: ["meeting_schedule.pdf"],
        readCount: 0,
        totalRecipients: 150,
      },
      {
        id: 2,
        title: "Holiday Notice",
        content:
          "School will remain closed on January 26th, 2024 for Republic Day celebration.",
        audience: "all",
        priority: "medium",
        status: "sent",
        scheduledDate: "2024-01-24T08:00",
        sentDate: "2024-01-24T08:00",
        createdBy: "Principal",
        createdAt: "2024-01-20T14:00",
        attachments: [],
        readCount: 89,
        totalRecipients: 200,
      },
      {
        id: 3,
        title: "Sports Day Event",
        content:
          "Annual sports day will be organized on February 15th, 2024. Students are encouraged to participate.",
        audience: "students",
        priority: "medium",
        status: "draft",
        scheduledDate: null,
        sentDate: null,
        createdBy: "Sports Teacher",
        createdAt: "2024-01-22T11:00",
        attachments: ["sports_schedule.pdf", "registration_form.pdf"],
        readCount: 0,
        totalRecipients: 0,
      },
      {
        id: 4,
        title: "Exam Schedule Update",
        content:
          "Mid-term examinations have been rescheduled. New dates will be announced soon.",
        audience: "students",
        priority: "high",
        status: "scheduled",
        scheduledDate: "2024-01-28T09:00",
        sentDate: null,
        createdBy: "Academic Head",
        createdAt: "2024-01-23T16:00",
        attachments: ["exam_schedule.pdf"],
        readCount: 0,
        totalRecipients: 180,
      },
      {
        id: 5,
        title: "Library Week Celebration",
        content:
          "Library week will be celebrated from February 1st to 7th, 2024 with various activities.",
        audience: "all",
        priority: "low",
        status: "sent",
        scheduledDate: "2024-01-30T10:00",
        sentDate: "2024-01-30T10:00",
        createdBy: "Librarian",
        createdAt: "2024-01-25T12:00",
        attachments: ["library_events.pdf"],
        readCount: 45,
        totalRecipients: 200,
      },
    ];
    setAnnouncements(sampleAnnouncements);
  }, []);

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "" || announcement.status === filterStatus;
    const matchesAudience =
      filterAudience === "" || announcement.audience === filterAudience;
    return matchesSearch && matchesStatus && matchesAudience;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800 border-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAudienceIcon = (audience) => {
    switch (audience) {
      case "students":
        return <Users className="w-4 h-4" />;
      case "parents":
        return <Users className="w-4 h-4" />;
      case "teachers":
        return <Users className="w-4 h-4" />;
      case "all":
        return <Target className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getAnnouncementStats = () => {
    const total = announcements.length;
    const sent = announcements.filter((a) => a.status === "sent").length;
    const scheduled = announcements.filter(
      (a) => a.status === "scheduled"
    ).length;
    const draft = announcements.filter((a) => a.status === "draft").length;
    const totalRecipients = announcements.reduce(
      (sum, a) => sum + a.totalRecipients,
      0
    );
    const totalReads = announcements.reduce((sum, a) => sum + a.readCount, 0);

    return { total, sent, scheduled, draft, totalRecipients, totalReads };
  };

  const stats = getAnnouncementStats();

  const handleAddAnnouncement = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(
        announcements.filter((announcement) => announcement.id !== id)
      );
    }
  };

  const handleSaveAnnouncement = (announcementData) => {
    if (editingAnnouncement) {
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === editingAnnouncement.id
            ? { ...announcementData, id: announcement.id }
            : announcement
        )
      );
    } else {
      setAnnouncements([
        ...announcements,
        { ...announcementData, id: Date.now() },
      ]);
    }
    setIsModalOpen(false);
    setEditingAnnouncement(null);
  };

  const handleSendNow = (id) => {
    setAnnouncements(
      announcements.map((announcement) =>
        announcement.id === id
          ? {
              ...announcement,
              status: "sent",
              sentDate: new Date().toISOString(),
              scheduledDate: new Date().toISOString(),
            }
          : announcement
      )
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Announcements</h1>
        <p className="text-gray-600">
          Create and manage school announcements for students, parents, and
          staff
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Send className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sent</p>
              <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.scheduled}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleAddAnnouncement}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </button>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search announcements..."
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
            <option value="sent">Sent</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={filterAudience}
            onChange={(e) => setFilterAudience(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Audiences</option>
            <option value="students">Students</option>
            <option value="parents">Parents</option>
            <option value="teachers">Teachers</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {announcement.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      announcement.status
                    )}`}
                  >
                    {announcement.status === "sent" && (
                      <Send className="w-3 h-3 mr-1" />
                    )}
                    {announcement.status === "scheduled" && (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {announcement.status === "draft" && (
                      <FileText className="w-3 h-3 mr-1" />
                    )}
                    {announcement.status}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                      announcement.priority
                    )}`}
                  >
                    {announcement.priority}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border-gray-200">
                    {getAudienceIcon(announcement.audience)}
                    <span className="ml-1 capitalize">
                      {announcement.audience}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditAnnouncement(announcement)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3">
              {announcement.content}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Created:{" "}
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </span>
              </div>
              {announcement.scheduledDate && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>
                    Scheduled:{" "}
                    {new Date(announcement.scheduledDate).toLocaleString()}
                  </span>
                </div>
              )}
              {announcement.sentDate && (
                <div className="flex items-center text-sm text-gray-500">
                  <Send className="w-4 h-4 mr-2" />
                  <span>
                    Sent: {new Date(announcement.sentDate).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>By: {announcement.createdBy}</span>
              </div>
            </div>

            {announcement.attachments.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Attachments:
                </div>
                <div className="flex flex-wrap gap-2">
                  {announcement.attachments.map((attachment, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {attachment}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {announcement.status === "sent" && (
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>
                  Read: {announcement.readCount}/{announcement.totalRecipients}
                </span>
                <span>
                  {Math.round(
                    (announcement.readCount / announcement.totalRecipients) *
                      100
                  )}
                  % read rate
                </span>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              {announcement.status === "scheduled" && (
                <button
                  onClick={() => handleSendNow(announcement.id)}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                >
                  Send Now
                </button>
              )}
              {announcement.status === "draft" && (
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm">
                  Schedule
                </button>
              )}
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
                <Eye className="w-3 h-3 inline mr-1" />
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No announcements found
          </h3>
          <p className="text-gray-600">
            {searchTerm || filterStatus || filterAudience
              ? "Try adjusting your search or filter criteria"
              : "Get started by creating your first announcement"}
          </p>
        </div>
      )}

      {/* Add/Edit Announcement Modal */}
      {isModalOpen && (
        <AnnouncementModal
          announcementData={editingAnnouncement}
          onSave={handleSaveAnnouncement}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAnnouncement(null);
          }}
        />
      )}
    </div>
  );
};

// Announcement Modal Component
const AnnouncementModal = ({ announcementData, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    announcementData || {
      title: "",
      content: "",
      audience: "all",
      priority: "medium",
      status: "draft",
      scheduledDate: "",
      attachments: [],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {announcementData ? "Edit Announcement" : "Create New Announcement"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audience
              </label>
              <select
                value={formData.audience}
                onChange={(e) =>
                  setFormData({ ...formData, audience: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="all">All</option>
                <option value="students">Students</option>
                <option value="parents">Parents</option>
                <option value="teachers">Teachers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="sent">Send Now</option>
            </select>
          </div>
          {formData.status === "scheduled" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Date & Time
              </label>
              <input
                type="datetime-local"
                value={formData.scheduledDate}
                onChange={(e) =>
                  setFormData({ ...formData, scheduledDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {announcementData ? "Update Announcement" : "Create Announcement"}
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

export default Announcements;
