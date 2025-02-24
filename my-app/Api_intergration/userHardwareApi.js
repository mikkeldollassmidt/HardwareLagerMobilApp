import axiosInstance from "./axiosInstance";

// 🟢 Get Available User Hardware
export const getAvailableUserHardware = async ({
  categoryIds,
  typeIds,
  weeks,
  searchString,
  startDate,
}) => {
  try {
    // Prepare query parameters
    const params = {
      categoryIds,
      typeIds,
      weeks,
      searchString,
      startDate,
    };

    // Send the GET request to fetch available hardware
    const response = await axiosInstance.get("/userhardware/available", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching available user hardware:", error);
    throw error;
  }
};

// 🟢 Get All User Hardware (No arguments)
export const getAllUserHardware = async () => {
  try {
    // Send the GET request to fetch all user hardware
    const response = await axiosInstance.get("/userhardware/GetMostLoaned");
    return response.data;
  } catch (error) {
    console.error("Error fetching all user hardware:", error);
    throw error;
  }
};

export const getUserLoanHistory = async (id) => {
    try {
      // Send the GET request to fetch user loan history by ID
      const response = await axiosInstance.get(`/userhardware/GetUserLoanHistory/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user loan history:", error);
      throw error;
    }
  };
  
  // 🟢 Get Active Loans By User Id
  export const getActiveLoansByUserId = async (id) => {
    try {
      // Send the GET request to fetch active loans by user ID
      const response = await axiosInstance.get(`/userhardware/GetActiveLoansByUserId/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching active loans by user ID:", error);
      throw error;
    }
  };