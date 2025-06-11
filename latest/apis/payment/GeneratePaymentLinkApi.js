import axiosInstance from "../axiosinstance";

const GeneratePaymentLinkApi = async (
  amount,
  ngo_id,
  ngo_name,
  user_id,
  contact
) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/payment/create-payment-link",
      {
        amount,
        ngo_id,
        ngo_name,
        user_id: user_id,
        contact: contact,
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
export default GeneratePaymentLinkApi;
