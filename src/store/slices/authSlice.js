import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import demoService from "../../services/demoService";

/*
 * FIXES FOR INFINITE LOOP ISSUE:
 *
 * 1. Fixed refreshToken.fulfilled to properly set isAuthenticated to true
 * 2. Added refreshToken.pending case to handle loading state
 * 3. Added safety checks to prevent invalid state updates
 * 4. Added initializeAuth action to properly set initial auth state
 * 5. Added handle401Error action for global 401 error handling
 * 6. Added proper error handling in rejected cases
 * 7. Added comprehensive logging for debugging
 */

// Listen for logout events from API service
if (typeof window !== "undefined") {
  window.addEventListener("auth:logout", () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    // Redirect to login page
    window.location.href = "/login";
  });
}

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // Check if this is a demo login
      if (
        credentials.email === "demo@school.com" &&
        credentials.password === "demo123"
      ) {
        const response = await demoService.demoLogin(credentials);
        return response;
      }

      // Regular API login
      // const response = await authService.login(credentials);
      // return response;
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
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Token refresh failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Check if in demo mode
      if (demoService.isDemoMode()) {
        await demoService.demoLogout();
        return null;
      }

      // Regular API logout
      await authService.logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// Demo mode actions
export const enableDemoMode = createAsyncThunk(
  "auth/enableDemoMode",
  async (_, { rejectWithValue }) => {
    try {
      const user = demoService.enableDemoMode();
      return {
        user,
        accessToken: "demo-access-token-" + Date.now(),
        refreshToken: "demo-refresh-token-" + Date.now(),
      };
    } catch (error) {
      return rejectWithValue("Failed to enable demo mode");
    }
  }
);

export const disableDemoMode = createAsyncThunk(
  "auth/disableDemoMode",
  async (_, { rejectWithValue }) => {
    try {
      await demoService.disableDemoMode();
      return null;
    } catch (error) {
      return rejectWithValue("Failed to disable demo mode");
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isTokenExpired: false,
  isDemoMode: false, // Don't call demoService.isDemoMode() here to prevent infinite loops
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTokenExpired: (state, action) => {
      state.isTokenExpired = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    initializeAuth: (state) => {
      console.log("initializeAuth called - checking demo mode and auth state");

      // Check for demo mode first
      if (demoService.isDemoMode()) {
        const demoUser = demoService.getDemoUser();
        if (demoUser) {
          state.user = demoUser;
          state.isAuthenticated = true;
          state.isDemoMode = true;
          state.token = "demo-token";
          console.log(
            "initializeAuth - demo mode enabled with user:",
            demoUser
          );
          return;
        }
      }

      // Regular auth initialization
      if (state.token) {
        if (state.user) {
          console.log(
            "initializeAuth - setting isAuthenticated to true for existing token and user"
          );
          state.isAuthenticated = true;
        } else {
          console.log(
            "initializeAuth - token exists but no user data, keeping isAuthenticated as false"
          );
          state.isAuthenticated = false;
        }
      } else {
        console.log(
          "initializeAuth - no token found, keeping isAuthenticated as false"
        );
        state.isAuthenticated = false;
      }

      console.log("initializeAuth completed - final state:", {
        isAuthenticated: state.isAuthenticated,
        isDemoMode: state.isDemoMode,
        hasUser: !!state.user,
        hasToken: !!state.token,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        console.log("refreshToken.pending - setting isLoading to true");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        console.log("refreshToken.fulfilled - updating state with new tokens");
        // Only update if we have valid data
        if (action.payload && action.payload.accessToken) {
          state.token = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.isAuthenticated = true;
          // Only update user if it's provided in the response
          if (action.payload.user) {
            state.user = action.payload.user;
          }
          state.isLoading = false;
          state.error = null;
          state.isTokenExpired = false;
          localStorage.setItem("token", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        } else {
          console.error("refreshToken.fulfilled - invalid payload received");
          state.isLoading = false;
          state.error = "Invalid token response";
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        console.log(
          "refreshToken.rejected - clearing tokens and setting expired"
        );
        state.isTokenExpired = true;
        state.isAuthenticated = false;
        state.token = null;
        state.refreshToken = null;
        state.isLoading = false; // Ensure loading is set to false
        state.error = "Token refresh failed"; // Set error message
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isTokenExpired = false;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })
      // Handle 401 errors globally
      .addCase("auth/handle401Error", (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isTokenExpired = true;
        state.isLoading = false; // Ensure loading is set to false
        state.error = "Authentication failed"; // Set error message
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })
      // Demo mode cases
      .addCase(enableDemoMode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isDemoMode = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(disableDemoMode.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isDemoMode = false;
        state.isTokenExpired = false;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { clearError, setTokenExpired, updateUser, initializeAuth } =
  authSlice.actions;

// Action creator for handling 401 errors
export const handle401Error = () => ({ type: "auth/handle401Error" });

export default authSlice.reducer;
