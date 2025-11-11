import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function SideDrawer({ isVisible, onClose }: Props) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isVisible]);

  const navigateTo = (path: string) => {
    onClose(); // close drawer first
    router.push(path);
  };

  return (
    <>
      {/* Overlay */}
      {isVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={onClose}
          activeOpacity={1}
        />
      )}

      {/* Drawer */}
      <Animated.View style={[styles.drawer, { left: slideAnim }]}>
        {/* Header with Title + Close button */}
        {/* Title */}
        <Text style={styles.title}>Menu</Text>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X size={24} color="#000" />
        </TouchableOpacity>

        {/* Menu Items */}
        <TouchableOpacity style={styles.item} onPress={() => navigateTo("/(tabs)")}>
          <Text style={styles.itemText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigateTo("/(tabs)/chats")}>
          <Text style={styles.itemText}>Chats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigateTo("/(tabs)/analytics")}>
          <Text style={styles.itemText}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigateTo("/(tabs)/customers")}>
          <Text style={styles.itemText}>Customers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => alert("Logging out...")}>
          <Text style={[styles.itemText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 100,
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,      // 🔹 Curve border
    borderBottomRightRadius: 0,   // 🔹 Curve border
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  item: {
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 16,
  },
closeBtn: {
  position: "absolute",
  top: 50,
  right: 20,
  zIndex: 10,
},

});
