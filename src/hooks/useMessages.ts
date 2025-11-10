import { useChatStore } from "../store/chatStore";

export default function useMessages(chatId: string) {
  // ✅ Use chatId here, not id
  const messages = useChatStore((state) => state.getMessages(chatId) ?? []);

  const sendMessage = (text: string) => {
    useChatStore.getState().sendMessage(chatId, {
      id: Date.now().toString(),
      text,
      sender: "me",
    });
  };

  return { messages, sendMessage };
}
