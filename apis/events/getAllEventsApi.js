import instance from "../axiosinstance";

const getAllEventsApi = async () => {
  try {
    const response = await instance.get("/api/v1/event/getallevents");
    // Ensure we return an array, even if the API response is not as expected
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    return []; // Return an empty array on error
  }
};

export default getAllEventsApi;
