import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const register = async ({
  fullname,
  email,
  password,
}: {
  fullname: string;
  email: string;
  password: string;
}): Promise<{ status: string; message: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/sign-up`, {
      fullname,
      email,
      password,
    });


    if (response.status === 201) {
      return {
        status: "success",
        message: "User registered successfully!",
      };
    }

    return {
      status: "error",
      message: "Unexpected response from server.",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: "error",
        message: error.response?.data?.detail || "Failed to register user.",
      };
    }
    return {
      status: "error",
      message: "An unexpected error occurred.",
    };
  }
};
