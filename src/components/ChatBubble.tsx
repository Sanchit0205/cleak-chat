// src/components/ChatBubble.tsx
import { View, Text, Image, StyleSheet } from "react-native";

interface ChatBubbleProps {
  message: string;
  isMine: boolean;
  type?: "text" | "image";
  timestamp?: string;
}

export default function ChatBubble({ message, isMine, type, timestamp }: ChatBubbleProps) {
  return (
    <View
      style={[
        styles.container,
        isMine ? styles.outgoing : styles.incoming,
      ]}
    >
      {type === "image" ? (
        <Image source={{ uri: message }} style={styles.image} />
      ) : (
        <Text style={styles.text}>{message}</Text>
      )}
      {timestamp && <Text style={styles.time}>{timestamp}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    marginVertical: 4,
    padding: 8,
    borderRadius: 12,
  },
  incoming: {
    backgroundColor: "#fff4f4ff",
    alignSelf: "flex-start",
  },
  outgoing: {
    backgroundColor: "#E9FCE8",
    alignSelf: "flex-end",
  },
  text: { fontSize: 16, color: "#000" },
  time: { fontSize: 11, color: "#999", marginTop: 2, textAlign: "right" },
  image: { width: 180, height: 180, borderRadius: 10 },
});
