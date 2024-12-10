
export interface MessageModel {
    text: string;
    sender: "user" | "bot";
    name: string;
    answer_type: "Text" | "Post" | "Meme" | "Video";
  }