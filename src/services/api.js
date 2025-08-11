import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors and token refresh
    // DISABLED: Automatic token refresh in interceptor to prevent conflicts with Redux-managed refreshToken action
    // The Redux action provides better state management and prevents infinite loops
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   try {
    //     const refreshTokenValue = localStorage.getItem("refreshToken");
    //     if (refreshTokenValue) {
    //       const response = await axios.post(
    //         `${
    //           process.env.REACT_APP_API_URL || "http://localhost:5000/api"
    //         }/auth/refresh`,
    //         { refreshToken: refreshTokenValue }
    //       );

    //       const { accessToken } = response.data;
    //       localStorage.setItem("token", accessToken);

    //       // Retry the original request with new token
    //       originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    //       return api(originalRequest);
    //     }
    //   } catch (refreshError) {
    //     // Refresh token failed, clear tokens and redirect to login
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("refreshToken");
    //     // Dispatch logout action through a custom event instead of importing store
    //     window.dispatchEvent(new CustomEvent("auth:logout"));
    //     return Promise.reject(refreshError);
    //   }
    // }

    // Handle other errors
    if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.error("Access forbidden:", error.response.data);
    } else if (error.response?.status === 401) {
      // Unauthorized - token is invalid or expired
      console.error("Unauthorized:", error.response.data);
      // Dispatch custom event to notify components about 401 error
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    } else if (error.response?.status === 404) {
      // Not found
      console.error("Resource not found:", error.response.data);
    } else if (error.response?.status >= 500) {
      // Server error
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

// File upload helper
export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });

  return response.data;
};

// Download file helper
export const downloadFile = async (url, filename) => {
  const response = await api.get(url, {
    responseType: "blob",
  });

  const blob = new Blob([response.data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};

// Export CSV helper
export const exportCSV = async (endpoint, params = {}) => {
  const response = await api.get(endpoint, {
    params,
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "text/csv" });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `export-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};

// Export PDF helper
export const exportPDF = async (endpoint, params = {}) => {
  const response = await api.get(endpoint, {
    params,
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `export-${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};

export default api;
