import axiosInstance from "../axiosinstance"; // Adjust path as needed

const resendOTPApi = async (phoneNumber) => {
  try {
    const response = await axiosInstance.post("/api/v1/user/resend-otp", {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default resendOTPApi;
