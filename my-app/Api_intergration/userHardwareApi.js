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

    // Send the GET request
    const response = await axiosInstance.get("/userhardware/available", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching available user hardware:", error);
    throw error;
  }
};
