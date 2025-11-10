import { create } from "zustand";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
}

interface ChatStore {
  chats: Record<string, Message[]>;
  getMessages: (id: string) => Message[];
  sendMessage: (id: string, msg: Message) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: {
    "1": [
      { id: "1", text: "Hello!", sender: "other" },
      { id: "2", text: "Hi!", sender: "me" },
    ],
    "2": [
      { id: "1", text: "Hey there", sender: "other" },
    ],
  },
  getMessages: (id: string) => get().chats[id] ?? [], // ✅ fallback to empty array
  sendMessage: (id: string, msg: Message) => {
    set((state) => ({
      chats: {
        ...state.chats,
        [id]: [...(state.chats[id] || []), msg],
      },
    }));
  },
}));
