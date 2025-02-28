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

// Get user by ID
export const getuserbyid = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/GetUserById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new user
export const createUser = async (username, hashedPassword, fullname, emailId) => {
  try {
    const response = await axiosInstance.post("/user/CreateUser", {
      username,
      hashedpassword: hashedPassword,  // Make sure the field name matches the backend API
      fullname,
      emailId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
