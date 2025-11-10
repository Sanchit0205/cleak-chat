// src/components/ChatBubble.tsx
import { View, Text, StyleSheet } from "react-native";
import { Message } from "../types/chat";

export default function ChatBubble({ text, type, timestamp }: Message) {
  const isOutgoing = type === "outgoing";

  return (
    <View
      style={[
        styles.container,
        isOutgoing ? styles.outgoing : styles.incoming,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.time}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
  },
  incoming: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  outgoing: {
    backgroundColor: "#E9FCE8",
    alignSelf: "flex-end",
  },
  text: { fontSize: 14, color: "#000" },
  time: { fontSize: 10, color: "#999", marginTop: 2, textAlign: "right" },
});
