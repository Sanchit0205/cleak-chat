import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function ChatsLayout() {
  return (
    <View style={styles.container}>
      {/* Slot will render either All Messages or Unread */}
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
