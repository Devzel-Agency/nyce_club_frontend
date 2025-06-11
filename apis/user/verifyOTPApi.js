import axiosInstance from "../axiosinstance"; // Adjust path as needed

const verifyOTPApi = async (phoneNumber, otp) => {
  try {
    const response = await axiosInstance.post("/api/v1/user/verify-otp", {
      phoneNumber,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default verifyOTPApi;
