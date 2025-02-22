// userApi.js
import axiosInstance from "./axiosInstance";

// Login user
export const loginUser = async (username, password) => {
  try {
    console.log("Sending request with:", { username, password });  // Debug log
    const response = await axiosInstance.post(`/user/Login`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in (suppressed):", error);  
    throw error;  // Rethrow the error for custom handling in the UI
  }
};
