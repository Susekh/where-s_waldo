import axios, { AxiosError } from "axios";

interface SendDataParams {
  route: string;
  username: string;
  password?: string;
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface DataPayload {
  username: string;
  password?: string;
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const SendData = async ({
  route,
  username,
  password,
  email,
  otp,
  newPassword,
  confirmPassword,
}: SendDataParams) => {
  try {
    let data: DataPayload;

    if (route === "log-in") {
      data = { username, password: password ?? "" };
    } else if (route === "forgot-password") {
      data = { username };
    } else if (route === "forgot-password/otp") {
      data = { username, otp: otp ?? "", newPassword, confirmPassword };
    } else {
      data = { username };
      if (password) data.password = password;
      if (email) data.email = email;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/${route}`,
      data,
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    console.log("data in send data ::", response.data);
    return response.data;
  } catch (error: unknown) {
    console.log("err in send data ::", error);

    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data };
    } else {
      return { success: false, message: "An unknown error occurred" };
    }
  }
};

export default SendData;
