import axiosInstance from "./axiosInstance";

// Get all types
export const getAllTypes = async () => {
    try {
      // Send the GET request to fetch all types
      const response = await axiosInstance.get("/type/GetAllTypes");
      return response.data;
    } catch (error) {
      console.error("Error fetching types:", error);
      throw error;
    }
  };