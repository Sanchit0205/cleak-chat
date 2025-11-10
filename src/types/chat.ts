// src/types/chat.ts

export type MessageType = "incoming" | "outgoing" | "attachment";

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  unread: boolean;
  messages?: Message[];
}
