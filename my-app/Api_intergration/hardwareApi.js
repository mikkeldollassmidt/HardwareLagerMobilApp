// hardwareApi.js
import axiosInstance from "./axiosInstance";

// 🟢 Hardware API

// Get all hardware details
export const getAllHardwares = async ({
  hardwarestatusid,
  typeid,
  IsDecsending,
  PageNumber,
  PageSize,
}) => {
  try {
    // Prepare query parameters
    const params = {
      hardwarestatusid,
      typeid,
      IsDecsending,
      PageNumber,
      PageSize,
    };

    // Send the GET request
    const response = await axiosInstance.get("/hardware/GetAllHardwares", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching hardware data:", error);
    throw error;
  }
};

export const GetHardwareById = async ({
  hardwareid,
}) => {
  try {
    // Prepare query parameters
    const params = {
      hardwareid,
    };

    // Send the GET request
    const response = await axiosInstance.get("/hardware/GetHardwareById/${id}", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching hardware data:", error);
    throw error;
  }
};