import axiosInstance from "./axiosInstance";

// Get all categories
export const getAllCategories = async () => {
    try {
      // Send the GET request to fetch all categories
      const response = await axiosInstance.get("/category/GetAllCategories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };