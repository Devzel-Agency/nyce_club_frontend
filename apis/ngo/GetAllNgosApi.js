import axiosInstance from "../axiosinstance";

const GetAllNgosApi = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/ngo/getallngos");
    // Ensure we return an array, even if the API response is not as expected
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    return []; // Return an empty array on error
  }
};

export default GetAllNgosApi;
