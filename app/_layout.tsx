import { Slot } from "expo-router";
import { View, StyleSheet, StatusBar } from "react-native";
import TopBar from "../src/components/TopBar";
import BottomTab from "../src/components/BottomTab";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      {/* 🔹 Black status bar */}
      <StatusBar backgroundColor="#ffffffff" barStyle="dark-content" />

      {/* 🔹 Fixed TopBar */}
      <TopBar />

      {/* 🔹 Dynamic content area */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* 🔹 Fixed BottomTab */}
      <BottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
