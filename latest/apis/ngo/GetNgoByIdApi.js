import axiosInstance from "../axiosinstance";

const GetNgoByIdApi = async (id) => {
  if (!id) return {}; // Return early if no ID is provided

  try {
    const response = await axiosInstance.get(`/api/v1/ngo/getngobyid/${id}`);
    // The original code returned data.data, so we do the same
    return response.data?.data || {};
  } catch (error) {
    console.error(`Error fetching NGO by ID ${id}:`, error);
    return {}; // Return an empty object on error
  }
};

export default GetNgoByIdApi;
