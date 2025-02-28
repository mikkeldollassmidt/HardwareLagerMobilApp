import axiosInstance from "./axiosInstance";

// Create email
export const createEmail = async (emailData) => {
  try {
    const response = await axiosInstance.post("/email", emailData);
    return response.data;
  } catch (error) {
    console.error("Error creating email:", error.response?.data || error.message);
    throw error;
  }
};

// Verify email (if needed)
export const verifyEmail = async (emailData) => {
  try {
    const response = await axiosInstance.put(`/email/verifyEmail`, emailData);
    return response.data;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
};

// Delete email by ID
export const deleteEmail = async (id) => {
  try {
    const response = await axiosInstance.delete(`/email/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting email:", error.response?.data || error.message);
    throw error;
  }
};
