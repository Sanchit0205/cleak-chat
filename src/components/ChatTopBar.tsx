import { View, Text, StyleSheet } from "react-native";

export default function ChatTopBar({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#075E54",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // text in white to contrast background
  },
});
