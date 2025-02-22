// axiosInstance.js
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to get the token (from local storage or any other method)
const getToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Error getting token from AsyncStorage:", error);
    return null;
  }
};

const anonymousEndpoints = [
  '/UserHardwareController/GetAvailableHardware',
  '/UserController/CreateUser',
  '/UserController/Login',
  '/TypeController/GetAllTypes',
  '/TypeController/GetById',
  '/HardwareStatusController/GetById',
  '/HardwareStatusController/GetAll',
  '/HardwareController/GetAll',
  '/HardwareController/GetById',
  '/HardwareCategoryController/GetAll',
  '/HardwareCategoryController/GetById',
  '/EmailController/VerifyEmail',
  '/CategoryController/GetAll',
  '/CategoryController/GetById',
];

const axiosInstance = axios.create({
  baseURL: 'http://api.itdepot.dk:5000/api',  // Your API base URL
  headers: {
    'Content-Type': 'application/json',  // Default Content-Type
    'Accept': 'application/json',        // Default Accept header
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const isAnonymous = anonymousEndpoints.includes(config.url);

    // If the endpoint is not anonymous, add the JWT token
    if (!isAnonymous) {
      const token = await getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors globally in the response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return the response if successful
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // You can suppress logging here if it's a login failure (handled in the UI)
        return Promise.reject(error); // Allow it to be handled by the UI layer
      }
    }

    // For other errors, we can log them globally
    console.error("API Error: ", error);

    return Promise.reject(error); // Ensure we propagate other errors normally
  }
);

export default axiosInstance;
