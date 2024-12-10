import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (
  email: string,
  password: string
): Promise<
  | { status: "success"; message: string; payload: { token: string; user: { id: number; fullname: string; email: string } } }
  | { status: "error"; message: string }
> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/sign-in`, {
      email,
      password,
    });
    return {
      status: "success",
      message: "Logged in successfully.",
      payload: {
        token: response.data.access_token,
        user: response.data.user,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return { status: "error", message: "Invalid email or password." };
    }
    return { status: "error", message: "An unexpected error occurred." };
  }
};
