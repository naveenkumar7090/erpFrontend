import api from "./api";

class AuthService {
  async login(credentials) {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  }

  async register(userData) {
    const response = await api.post("/auth/register", userData);
    return response.data;
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  }

  async logout() {
    const response = await api.post("/auth/logout");
    return response.data;
  }

  async forgotPassword(email) {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  }

  async resetPassword(token, password) {
    const response = await api.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  }

  async changePassword(currentPassword, newPassword) {
    const response = await api.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  async getProfile() {
    const response = await api.get("/auth/profile");
    return response.data;
  }

  async updateProfile(profileData) {
    const response = await api.put("/auth/profile", profileData);
    return response.data;
  }

  async verifyEmail(token) {
    const response = await api.post("/auth/verify-email", { token });
    return response.data;
  }

  async resendVerificationEmail() {
    const response = await api.post("/auth/resend-verification");
    return response.data;
  }

  async googleAuth(code) {
    const response = await api.post("/auth/google", { code });
    return response.data;
  }
}

export default new AuthService();
