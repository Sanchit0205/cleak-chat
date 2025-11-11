// app/(tabs)/chats/[id].tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useChatStore } from "../../../src/store/chatStore";
import ChatDetailTopBar from "../../../src/components/ChatDetailTopBar";
import ChatBubble from "../../../src/components/ChatBubble";
import MessageInput from "../../../src/components/MessageInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const chatId = Array.isArray(id) ? id[0] : id;

  const { getMessages, sendMessage, chats, loadChats } = useChatStore();
  const [inputText, setInputText] = useState("");
  const [chat, setChat] = useState<any>(null);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  // Load chats initially
  useEffect(() => {
    loadChats();
  }, []);

  // Find the current chat
  useEffect(() => {
    const found = chats.find((c) => c.id === chatId);
    if (found) setChat(found);
  }, [chats, chatId]);

  const messages = getMessages(chatId);

  const handleSend = (content?: string, type: "text" | "image" = "text") => {
    const messageContent = content ?? inputText;
    if (!messageContent.trim() && type === "text") return;
    sendMessage(chatId, messageContent, type);
    setInputText("");
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingBottom: insets.bottom }]}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 86}
    >
      {/* Dismiss keyboard on tapping outside */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ChatDetailTopBar title={chat?.name || "Chat"} />

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChatBubble
                message={item.content}
                isMine={item.sender === "me"}
                timestamp={new Date(item.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            )}
            contentContainerStyle={styles.messagesContainer}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          <MessageInput
            value={inputText}
            onChangeText={setInputText}
            onSend={handleSend}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    padding: 16,
    flexGrow: 1,
  },
});
