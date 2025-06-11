import axiosInstance from "../axiosinstance";

const GetUserApi = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get("/api/v1/user/profile", {
      headers,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};
export default GetUserApi;
