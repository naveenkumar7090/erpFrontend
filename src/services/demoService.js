// Demo Service - Provides demo data and functionality without API calls
class DemoService {
  constructor() {
    console.log("DemoService constructor called");
    this.demoMode = false;
    this.demoUser = null;
    this.demoData = this.initializeDemoData();

    // Initialize demo mode state safely
    this.initializeDemoModeState();
    console.log("DemoService constructor completed");
  }

  // Safely initialize demo mode state
  initializeDemoModeState() {
    try {
      // Only check localStorage if we're in a browser environment
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        const storedDemoMode = localStorage.getItem("demoMode");
        if (storedDemoMode === "true") {
          this.demoMode = true;
          const storedUser = localStorage.getItem("demoUser");
          if (storedUser) {
            try {
              this.demoUser = JSON.parse(storedUser);
            } catch (e) {
              console.warn("Failed to parse stored demo user:", e);
              this.demoUser = this.demoData.user;
            }
          }
        }
      }
    } catch (error) {
      console.warn("Error initializing demo mode state:", error);
      // Fallback to default state
      this.demoMode = false;
      this.demoUser = null;
    }
  }

  // Initialize demo data
  initializeDemoData() {
    return {
      user: {
        id: "demo-user-001",
        email: "demo@school.com",
        firstName: "Demo",
        lastName: "Administrator",
        fullName: "Demo Administrator",
        role: "admin",
        roles: ["admin", "teacher", "student"],
        profilePicture:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        phone: "+1 (555) 123-4567",
        address: "123 Demo Street, Demo City, DC 12345",
        dateOfBirth: "1990-01-01",
        gender: "Not specified",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        status: "active",
        permissions: [
          "school:read",
          "school:write",
          "school:delete",
          "academic:read",
          "academic:write",
          "academic:delete",
          "finance:read",
          "finance:write",
          "finance:delete",
          "communication:read",
          "communication:write",
          "communication:delete",
          "user:read",
          "user:write",
          "user:delete",
        ],
      },
      classes: [
        {
          id: "class-001",
          name: "Grade 10A",
          grade: "10",
          section: "A",
          capacity: 30,
          currentEnrollment: 28,
          teacher: "John Smith",
          subjects: ["Mathematics", "Science", "English"],
          schedule: "Monday-Friday, 8:00 AM - 3:00 PM",
          room: "Room 101",
          status: "active",
        },
        {
          id: "class-002",
          name: "Grade 9B",
          grade: "9",
          section: "B",
          capacity: 25,
          currentEnrollment: 22,
          teacher: "Sarah Johnson",
          subjects: ["History", "Geography", "Literature"],
          schedule: "Monday-Friday, 8:00 AM - 3:00 PM",
          room: "Room 102",
          status: "active",
        },
      ],
      sections: [
        {
          id: "sec-001",
          name: "A",
          grade: "10",
          capacity: 30,
          currentEnrollment: 28,
        },
        {
          id: "sec-002",
          name: "B",
          grade: "9",
          capacity: 25,
          currentEnrollment: 22,
        },
        {
          id: "sec-003",
          name: "C",
          grade: "11",
          capacity: 28,
          currentEnrollment: 25,
        },
      ],
      subjects: [
        {
          id: "sub-001",
          name: "Mathematics",
          code: "MATH101",
          grade: "10",
          teacher: "John Smith",
        },
        {
          id: "sub-002",
          name: "Science",
          code: "SCI101",
          grade: "10",
          teacher: "John Smith",
        },
        {
          id: "sub-003",
          name: "English",
          code: "ENG101",
          grade: "10",
          teacher: "Sarah Johnson",
        },
      ],
      students: [
        {
          id: "student-001",
          firstName: "Alice",
          lastName: "Johnson",
          fullName: "Alice Johnson",
          email: "alice.johnson@school.com",
          grade: "10",
          section: "A",
          rollNumber: "1001",
          status: "active",
        },
        {
          id: "student-002",
          firstName: "Bob",
          lastName: "Smith",
          fullName: "Bob Smith",
          email: "bob.smith@school.com",
          grade: "9",
          section: "B",
          rollNumber: "2001",
          status: "active",
        },
      ],
      teachers: [
        {
          id: "teacher-001",
          firstName: "John",
          lastName: "Smith",
          fullName: "John Smith",
          email: "john.smith@school.com",
          subjects: ["Mathematics", "Science"],
          qualification: "M.Sc. Mathematics",
          experience: "8 years",
          status: "active",
        },
        {
          id: "teacher-002",
          firstName: "Sarah",
          lastName: "Johnson",
          fullName: "Sarah Johnson",
          email: "sarah.johnson@school.com",
          subjects: ["English", "Literature"],
          qualification: "M.A. English",
          experience: "5 years",
          status: "active",
        },
      ],
      fees: [
        {
          id: "fee-001",
          studentId: "student-001",
          studentName: "Alice Johnson",
          type: "Tuition Fee",
          amount: 500,
          dueDate: "2024-02-01",
          status: "paid",
          paidDate: "2024-01-15",
        },
        {
          id: "fee-002",
          studentId: "student-002",
          studentName: "Bob Smith",
          type: "Tuition Fee",
          amount: 500,
          dueDate: "2024-02-01",
          status: "pending",
          paidDate: null,
        },
      ],
      announcements: [
        {
          id: "announcement-001",
          title: "Parent-Teacher Meeting",
          content:
            "Parent-Teacher meeting scheduled for next Friday at 3:00 PM.",
          author: "Principal",
          priority: "high",
          createdAt: "2024-01-15T10:00:00.000Z",
          expiresAt: "2024-02-15T23:59:59.000Z",
        },
        {
          id: "announcement-002",
          title: "Sports Day",
          content:
            "Annual sports day will be held on March 15th. All students are encouraged to participate.",
          author: "Sports Department",
          priority: "medium",
          createdAt: "2024-01-10T14:00:00.000Z",
          expiresAt: "2024-03-20T23:59:59.000Z",
        },
      ],
    };
  }

  // Enable demo mode
  enableDemoMode() {
    this.demoMode = true;
    localStorage.setItem("demoMode", "true");
    localStorage.setItem("demoUser", JSON.stringify(this.demoData.user));
    return this.demoData.user;
  }

  // Disable demo mode
  disableDemoMode() {
    this.demoMode = false;
    localStorage.removeItem("demoMode");
    localStorage.removeItem("demoUser");
    return null;
  }

  // Check if demo mode is enabled
  isDemoMode() {
    console.log("isDemoMode called - checking demo mode state");

    try {
      // Return the instance variable first (faster)
      if (this.demoMode) {
        console.log("isDemoMode - returning true (instance variable)");
        return true;
      }

      // Only check localStorage if we're in a browser environment
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        const localStorageValue = localStorage.getItem("demoMode") === "true";
        console.log("isDemoMode - localStorage value:", localStorageValue);
        return localStorageValue;
      }

      console.log("isDemoMode - returning false (no browser environment)");
      return false;
    } catch (error) {
      console.warn("Error checking demo mode:", error);
      return false;
    }
  }

  // Get demo user
  getDemoUser() {
    if (this.isDemoMode()) {
      const storedUser = localStorage.getItem("demoUser");
      return storedUser ? JSON.parse(storedUser) : this.demoData.user;
    }
    return null;
  }

  // Get demo data for any entity
  getDemoData(entity) {
    if (!this.isDemoMode()) return null;
    return this.demoData[entity] || [];
  }

  // Simulate API delay
  async simulateApiCall(data, delay = 500) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  // Demo login
  async demoLogin(credentials) {
    if (
      credentials.email === "demo@school.com" &&
      credentials.password === "demo123"
    ) {
      const user = this.enableDemoMode();
      return {
        user,
        accessToken: "demo-access-token-" + Date.now(),
        refreshToken: "demo-refresh-token-" + Date.now(),
      };
    }
    throw new Error("Invalid demo credentials. Use demo@school.com / demo123");
  }

  // Demo logout
  async demoLogout() {
    return this.disableDemoMode();
  }

  // Get demo profile
  async getDemoProfile() {
    return this.simulateApiCall(this.getDemoUser());
  }

  // Update demo profile
  async updateDemoProfile(profileData) {
    const user = this.getDemoUser();
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem("demoUser", JSON.stringify(updatedUser));
    return this.simulateApiCall(updatedUser);
  }

  // Get demo classes
  async getDemoClasses() {
    return this.simulateApiCall({
      classes: this.getDemoData("classes"),
      pagination: {
        page: 1,
        limit: 10,
        total: this.getDemoData("classes").length,
        totalPages: 1,
      },
    });
  }

  // Get demo sections
  async getDemoSections() {
    return this.simulateApiCall({
      sections: this.getDemoData("sections"),
      pagination: {
        page: 1,
        limit: 10,
        total: this.getDemoData("sections").length,
        totalPages: 1,
      },
    });
  }

  // Get demo subjects
  async getDemoSubjects() {
    return this.simulateApiCall({
      subjects: this.getDemoData("subjects"),
      pagination: {
        page: 1,
        limit: 10,
        total: this.getDemoData("subjects").length,
        totalPages: 1,
      },
    });
  }

  // Get demo students
  async getDemoStudents() {
    return this.simulateApiCall({
      students: this.getDemoData("students"),
      pagination: {
        page: 1,
        limit: 10,
        total: this.getDemoData("students").length,
        totalPages: 1,
      },
    });
  }

  // Get demo teachers
  async getDemoTeachers() {
    return this.simulateApiCall({
      teachers: this.getDemoData("teachers"),
      pagination: {
        page: 1,
        limit: 10,
        total: this.getDemoData("teachers").length,
        totalPages: 1,
      },
    });
  }

  // Get demo fees
  async getDemoFees() {
    return this.simulateApiCall({
      fees: this.getDemoData("fees"),
      pagination: {
        page: 1,
        limit: 10,
        total: this.getDemoData("fees").length,
        totalPages: 1,
      },
    });
  }

  // Get demo announcements
  async getDemoAnnouncements() {
    return this.simulateApiCall({
      announcements: this.getDemoData("announcements"),
      pagination: {
        page: 1,
        limit: 10,
        total: this.getDemoData("announcements").length,
        totalPages: 1,
      },
    });
  }
}

// Create singleton instance
const demoService = new DemoService();

export default demoService;
