import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ChatFilterTabs({ active }: { active: "all" | "unread" }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, active === "all" && styles.activeTab]}
        onPress={() => router.push("/(tabs)/chats")}
      >
        <Text style={[styles.text, active === "all" && styles.activeText]}>All Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, active === "unread" && styles.activeTab]}
        onPress={() => router.push("/(tabs)/chats/unread")}
      >
        <Text style={[styles.text, active === "unread" && styles.activeText]}>Unread</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007D69",
  },
  text: {
    fontSize: 16,
    color: "#888",
  },
  activeText: {
    color: "#007D69",
    fontWeight: "600",
  },
});
