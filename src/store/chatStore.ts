// cleak-chat-clone\src\store\chatStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Message {
  id: string;
  chatId: string;
  type: "text" | "image";
  content: string;
  sender: "me" | "other";
  timestamp: number;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>; // messages[chatId] = []
  loadChats: () => Promise<void>;
  sendMessage: (chatId: string, content: string, type?: "text" | "image") => void;
  getMessages: (chatId: string) => Message[];
  deleteChat: (chatId: string) => Promise<void>;
  receiveMessage: (chatId: string, content: string) => Promise<void>;

  persistData: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  messages: {},

  loadChats: async () => {
    try {
      const savedChats = await AsyncStorage.getItem("chats");
      const savedMessages = await AsyncStorage.getItem("messages");

      if (savedChats && savedMessages) {
        set({
          chats: JSON.parse(savedChats),
          messages: JSON.parse(savedMessages),
        });
      } else {
        // Initialize dummy data for first run
        const dummyChats: Chat[] = [
  { id: "1", name: "John Doe", lastMessage: "Hey, how are you?", time: "10:24 PM", unread: true },
  { id: "2", name: "CLEAK", lastMessage: "Your technician is coming tomorrow.", time: "09:30 AM", unread: false },
  { id: "3", name: "Alice", lastMessage: "Did you receive the files?", time: "Yesterday", unread: true },
  { id: "4", name: "Rahul Sharma", lastMessage: "Let's catch up this weekend!", time: "8:45 PM", unread: false },
  { id: "5", name: "Priya Singh", lastMessage: "Sending you the document now.", time: "3:12 PM", unread: true },
];


        const dummyMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", chatId: "1", type: "text", content: "Hey, how are you?", sender: "other", timestamp: Date.now() - 3600000 },
    { id: "m2", chatId: "1", type: "text", content: "I'm good! What about you?", sender: "me", timestamp: Date.now() - 1800000 },
  ],
  "2": [
    { id: "m3", chatId: "2", type: "text", content: "Your technician is coming tomorrow.", sender: "other", timestamp: Date.now() - 7200000 },
  ],
  "3": [
    { id: "m4", chatId: "3", type: "text", content: "Did you receive the files?", sender: "other", timestamp: Date.now() - 600000 },
  ],
  "4": [
    { id: "m5", chatId: "4", type: "text", content: "Let's catch up this weekend!", sender: "other", timestamp: Date.now() - 400000 },
  ],
  "5": [
    { id: "m6", chatId: "5", type: "text", content: "Sending you the document now.", sender: "other", timestamp: Date.now() - 200000 },
  ],
};


        set({ chats: dummyChats, messages: dummyMessages });
        await AsyncStorage.setItem("chats", JSON.stringify(dummyChats));
        await AsyncStorage.setItem("messages", JSON.stringify(dummyMessages));
      }
    } catch (err) {
      console.log("Error loading chats:", err);
    }
  },

  sendMessage: (chatId, content, type = "text") => {
    const { messages, chats } = get();
    const newMessage: Message = {
      id: Date.now().toString(),
      chatId,
      type,
      content,
      sender: "me",
      timestamp: Date.now(),
    };
    
    const updatedMessages = {
      ...messages,
      [chatId]: [...(messages[chatId] || []), newMessage],
    };

    const updatedChats = chats.map(chat =>
      chat.id === chatId
        ? { ...chat, lastMessage: content, time: "Now", unread: false }
        : chat
    );

    set({ messages: updatedMessages, chats: updatedChats });
    get().persistData();
  },
  
  deleteChat: async (chatId: string) => {
    const { chats, messages } = get();

    // Filter out the chat from list
    const updatedChats = chats.filter((chat) => chat.id !== chatId);
    const updatedMessages = { ...messages };
    delete updatedMessages[chatId];

    // Update Zustand + Storage
    set({ chats: updatedChats, messages: updatedMessages });
    await AsyncStorage.setItem("chats", JSON.stringify(updatedChats));
    await AsyncStorage.setItem("messages", JSON.stringify(updatedMessages));
  },


  getMessages: (chatId) => {
    const { messages } = get();
    return messages[chatId] || [];
  },
  receiveMessage: async (chatId: string, content: string) => {
  const { messages } = get();
  const newMessage = {
    id: Date.now().toString(),
    chatId,
    type: "text",
    content,
    sender: "other",
    timestamp: Date.now(),
  };

  const updatedMessages = {
    ...messages,
    [chatId]: [...(messages[chatId] || []), newMessage],
  };

  set({ messages: updatedMessages });
  await AsyncStorage.setItem("messages", JSON.stringify(updatedMessages));
},

  persistData: async () => {
    const { chats, messages } = get();
    await AsyncStorage.setItem("chats", JSON.stringify(chats));
    await AsyncStorage.setItem("messages", JSON.stringify(messages));
  },
}));
