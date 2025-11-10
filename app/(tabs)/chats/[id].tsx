// app/(tabs)/chats/[id].tsx
import React, { useRef, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ChatDetailTopBar from "../../../src/components/ChatDetailTopBar";
import ChatBubble from "../../../src/components/ChatBubble";
import MessageInput from "../../../src/components/MessageInput";
import useMessages from "../../../src/hooks/useMessages";

export default function ChatDetail() {
  const { id } = useLocalSearchParams();
  const { messages, sendMessage } = useMessages(id as string);
  const flatListRef = useRef<FlatList>(null);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
  if (messages.length > 0) {
    flatListRef.current?.scrollToEnd({ animated: true });
  }
}, [messages.length]); // ✅ use messages.length instead of messages


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ChatDetailTopBar
        name={`Chat ${id}`}
        subtitle="Click here for contact info."
      />

      <FlatList
  ref={flatListRef}
  data={messages || []} // fallback
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ChatBubble {...item} />}
  contentContainerStyle={styles.chatContainer}
/>


      <MessageInput
        value={inputText}
        onChangeText={setInputText}
        onSend={() => {
          sendMessage(inputText);
          setInputText("");
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F0F0" },
  chatContainer: { padding: 12, paddingBottom: 80 },
});
