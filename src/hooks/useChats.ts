// src/hooks/useChats.ts
import { useEffect, useState } from "react";
import { Chat } from "../types/chat";
import { useChatStore } from "../store/chatStore";

// Dummy API simulation
const fetchChats = async (): Promise<Chat[]> => {
  return [
    { id: "1", name: "CLEAK", lastMessage: "Hello!", unread: true },
    { id: "2", name: "Customer 919168642999", lastMessage: "Thanks!", unread: false },
  ];
};

export default function useChats() {
  const [loading, setLoading] = useState(true);
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);

  useEffect(() => {
    fetchChats().then((data) => {
      setChats(data);
      setLoading(false);
    });
  }, []);

  return { chats, loading };
}
