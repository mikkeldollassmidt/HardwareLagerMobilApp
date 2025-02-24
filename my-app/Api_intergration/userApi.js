// userApi.js
import axiosInstance from "./axiosInstance";

// Login user
export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post(`/user/Login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;  // Rethrow the error for custom handling in the UI
  }
};

//TODO: Implement
