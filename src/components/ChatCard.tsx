// cleak-chat-clone\src\components\ChatCard.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

export default function ChatCard({ id, name, lastMessage, time, unread }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push(`/(tabs)/chats/${id}`)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name[0]}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={[styles.message, unread && styles.unread]} numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 12, alignItems: "center", borderBottomWidth: 1, borderColor: "#eee" },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#22C55E", justifyContent: "center", alignItems: "center", marginRight: 12 },
  avatarText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  info: { flex: 1, justifyContent: "center" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  name: { fontSize: 16, fontWeight: "600" },
  time: { fontSize: 12, color: "#999" },
  message: { fontSize: 14, color: "#555" },
  unread: { fontWeight: "bold", color: "#000" },
});
