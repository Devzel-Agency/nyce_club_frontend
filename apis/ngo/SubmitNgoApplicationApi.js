import axiosInstance from "../axiosinstance"; // Adjust this path if your axiosInstance is located elsewhere

const SubmitNgoApplicationApi = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/ngo/requestngo", // Axios automatically prepends base URL from axiosInstance
      formData // Axios automatically stringifies JSON body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default SubmitNgoApplicationApi;
