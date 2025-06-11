import axiosInstance from "../axiosinstance"; // Adjust path as needed

const sendOTPApi = async (name, phoneNumber) => {
  try {
    const response = await axiosInstance.post("/api/v1/user/send-otp", {
      name,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    // It's generally better to re-throw the error so the calling component can handle it,
    // especially for showing specific error messages from the backend.
    throw error;
  }
};

export default sendOTPApi;
