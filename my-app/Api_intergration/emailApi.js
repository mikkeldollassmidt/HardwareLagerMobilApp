// emailApi.js
import axiosInstance from "./axiosInstance";

// 🟢 Email API

// Create email
export const createEmail = async (emailData) => {
  try {
    const response = await axiosInstance.post(`/api/email`, emailData);
    return response.data;
  } catch (error) {
    console.error("Error creating email:", error);
    throw error;
  }
};

// Verify email
export const verifyEmail = async (emailData) => {
  try {
    const response = await axiosInstance.put(`/api/email/verifyEmail`, emailData);
    return response.data;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
};
