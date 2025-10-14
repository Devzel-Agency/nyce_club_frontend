import instance from "../axiosinstance";

const getEventByIdApi = async (id) => {
  try {
    const response = await instance.get(`/api/v1/event/geteventbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return {
      error: error?.response?.data?.message || "Failed to fetch event details.",
    };
  }
};

export default getEventByIdApi;
