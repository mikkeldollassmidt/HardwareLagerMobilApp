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
    const response = await axiosInstance.get("/userhardware/getAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching all user hardware:", error);
    throw error;
  }
};
