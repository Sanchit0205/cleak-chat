export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: Message[];
}

export interface Message {
  id: string;
  sender: "me" | "other";
  type: "text" | "image";
  content: string;
  time: string;
}
