import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const generateContent = async (
  userId: string,
  prompt: string,
  tone: string,
  content: string
): Promise<
  | { status: "success"; message: string; payload: any }
  | { status: "error"; message: string }
> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/chat`, {
      user_id: userId,
      prompt,
      tone,
      content,
    });

    return {
      status: "success",
      message: "Chat response generated successfully.",
      payload: response.data.data,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.detail || "Failed to generate chat response.",
    };
  }
};
