// src/store/chatStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Message {
  id: string;
  chatId: string;
  type: "text" | "image";
  content: string;
  sender: "me" | "other";
  timestamp: number;
  read?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

export interface Contact {
  name: string;
  phone: string;
  email?: string;
  optIn?: string;
}

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>;
  contacts: Record<string, Contact>;

  loadChats: () => Promise<void>;
  sendMessage: (chatId: string, content: string, type?: "text" | "image") => void;
  getMessages: (chatId: string) => Message[];
  getContactByChatId: (chatId: string) => Contact | undefined;
  deleteChat: (chatId: string) => Promise<void>;
  receiveMessage: (chatId: string, content: string) => Promise<void>;
  markMessagesAsRead: (chatId: string) => void;
  persistData: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  messages: {},
  contacts: {},

  loadChats: async () => {
    try {
      const savedChats = await AsyncStorage.getItem("chats");
      const savedMessages = await AsyncStorage.getItem("messages");
      const savedContacts = await AsyncStorage.getItem("contacts");

      if (savedChats && savedMessages && savedContacts) {
        set({
          chats: JSON.parse(savedChats),
          messages: JSON.parse(savedMessages),
          contacts: JSON.parse(savedContacts),
        });
      } else {
        // --- DUMMY INITIAL DATA ---
        const dummyChats: Chat[] = [
          { id: "1", name: "John Doe", lastMessage: "Hey, how are you?", time: "10:24 PM", unread: true },
          { id: "2", name: "CLEAK", lastMessage: "Your technician is coming tomorrow.", time: "09:30 AM", unread: false },
          { id: "3", name: "Alice", lastMessage: "Let’s meet tomorrow?", time: "8:12 AM", unread: true },
          { id: "4", name: "Bob", lastMessage: "Project files updated!", time: "11:47 PM", unread: false },
          { id: "5", name: "Sophie", lastMessage: "Got your email!", time: "06:15 PM", unread: true },
          { id: "7", name: "Riya", lastMessage: "Let’s catch up soon.", time: "04:23 PM", unread: true },
          { id: "8", name: "Tanish", lastMessage: "See you at gym", time: "05:09 PM", unread: false },
        ];

        const dummyMessages: Record<string, Message[]> = {
          "1": [
            { id: "m1", chatId: "1", type: "text", content: "Hey, how are you?", sender: "other", timestamp: Date.now() - 3600000, read: false },
            { id: "m2", chatId: "1", type: "text", content: "I'm good! What about you?", sender: "me", timestamp: Date.now() - 1800000, read: true },
          ],
          "2": [
            { id: "m3", chatId: "2", type: "text", content: "Your technician is coming tomorrow.", sender: "other", timestamp: Date.now() - 7200000, read: true },
          ],
          "3": [
            { id: "m4", chatId: "3", type: "text", content: "Let’s meet tomorrow?", sender: "other", timestamp: Date.now() - 5400000, read: false },
          ],
          "4": [
            { id: "m5", chatId: "4", type: "text", content: "Project files updated!", sender: "other", timestamp: Date.now() - 3600000, read: true },
          ],
          "5": [
            { id: "m6", chatId: "5", type: "text", content: "Got your email!", sender: "other", timestamp: Date.now() - 720000, read: false },
          ],
          
          "7": [
            { id: "m8", chatId: "7", type: "text", content: "Let’s catch up soon.", sender: "other", timestamp: Date.now() - 900000, read: false },
          ],
        };

        const dummyContacts: Record<string, Contact> = {
          "1": { name: "John Doe", phone: "+919999999999", email: "john@example.com", optIn: "Subscribed" },
          "2": { name: "CLEAK", phone: "917387567342", email: "support@cleak.in", optIn: "UNKNOWN" },
          "3": { name: "Alice", phone: "+919812345678", email: "alice@example.com", optIn: "Subscribed" },
          "4": { name: "Bob", phone: "+918765432198", email: "bob@company.com", optIn: "Subscribed" },
          "5": { name: "Sophie", phone: "+918976543210", email: "sophie@mail.com", optIn: "Subscribed" },
          "6": { name: "Mark", phone: "+917389456732", email: "mark@tech.io", optIn: "Subscribed" },
          "7": { name: "Riya", phone: "+919283746512", email: "riya@insta.com", optIn: "UNKNOWN" },
          "8": { name: "Tanish", phone: "+917372819302", email: "tanish@workmail.com", optIn: "Subscribed" },
        };

        set({ chats: dummyChats, messages: dummyMessages, contacts: dummyContacts });
        await get().persistData();
      }
    } catch (err) {
      console.log("Error loading chats:", err);
    }
  },

  getContactByChatId: (chatId) => get().contacts[chatId],

  sendMessage: (chatId, content, type = "text") => {
    const { messages, chats } = get();
    const newMessage: Message = {
      id: Date.now().toString(),
      chatId,
      type,
      content,
      sender: "me",
      timestamp: Date.now(),
      read: true,
    };

    const updatedMessages = {
      ...messages,
      [chatId]: [...(messages[chatId] || []), newMessage],
    };

    const updatedChats = chats.map((chat) =>
      chat.id === chatId
        ? { ...chat, lastMessage: content, time: "Now", unread: false }
        : chat
    );

    set({ messages: updatedMessages, chats: updatedChats });
    get().persistData();
  },

  receiveMessage: async (chatId, content) => {
    const { messages, chats } = get();
    const newMessage: Message = {
      id: Date.now().toString(),
      chatId,
      type: "text",
      content,
      sender: "other",
      timestamp: Date.now(),
      read: false,
    };

    const updatedMessages = {
      ...messages,
      [chatId]: [...(messages[chatId] || []), newMessage],
    };

    const updatedChats = chats.map((chat) =>
      chat.id === chatId
        ? { ...chat, lastMessage: content, time: "Now", unread: true }
        : chat
    );

    set({ messages: updatedMessages, chats: updatedChats });
    await get().persistData();
  },

  markMessagesAsRead: (chatId) => {
    const { messages, chats } = get();

    const updatedMessages = {
      ...messages,
      [chatId]: (messages[chatId] || []).map((msg) =>
        msg.sender === "other" ? { ...msg, read: true } : msg
      ),
    };

    const updatedChats = chats.map((chat) =>
      chat.id === chatId ? { ...chat, unread: false } : chat
    );

    set({ messages: updatedMessages, chats: updatedChats });
    get().persistData();
  },

  deleteChat: async (chatId) => {
    const { chats, messages, contacts } = get();
    const updatedChats = chats.filter((chat) => chat.id !== chatId);
    const updatedMessages = { ...messages };
    const updatedContacts = { ...contacts };

    delete updatedMessages[chatId];
    delete updatedContacts[chatId];

    set({ chats: updatedChats, messages: updatedMessages, contacts: updatedContacts });
    await get().persistData();
  },

  getMessages: (chatId) => get().messages[chatId] || [],

  persistData: async () => {
    const { chats, messages, contacts } = get();
    await AsyncStorage.setItem("chats", JSON.stringify(chats));
    await AsyncStorage.setItem("messages", JSON.stringify(messages));
    await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
  },
}));
