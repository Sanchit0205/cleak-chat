// src/components/UserMenuPopup.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  userName: string;
  userRole?: string;
  onLogout: () => void;
  onNavigate?: (screen: string) => void;
}

export default function UserMenuPopup({
  isVisible,
  onClose,
  userName,
  userRole = "User",
  onLogout,
  onNavigate,
}: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [showPopup, setShowPopup] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShowPopup(true); // show immediately
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 30,
        tension: 100,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowPopup(false)); // hide after animation
    }
  }, [isVisible]);

  const menuItems = [
    { label: "Your Account", screen: "Account" },
    { label: "Store Details", screen: "Store" },
    { label: "My Plans", screen: "Plans" },
    { label: "Invite Team", screen: "Invite" },
    { label: "Video Academy", screen: "VideoAcademy" },
    { label: "Customer Care: +917387567342", screen: null },
  ];

  if (!showPopup) return null; // remove from render tree when not visible

  return (
    <View style={styles.wrapper}>
      {/* Overlay */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Animated Popup */}
      <Animated.View
        style={[styles.popupContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userRole}>{userRole}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuItems}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, item.screen && styles.menuItemHover]}
              onPress={() => {
                if (item.screen && onNavigate) onNavigate(item.screen);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.menuItemText,
                  item.screen === null && styles.secondaryText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            onLogout();
            onClose();  
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const popupWidth = width * 0.65; // responsive width

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent", // transparent but clickable
  },

  popupContainer: {
  marginTop: 60, // distance from top (where your profile icon might be)
  marginRight: 16,
  width: popupWidth,
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 15,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 10,
  elevation: 6,
  },

  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
    marginBottom: 8,
  },
  userName: { fontSize: 16, fontWeight: "700" },
  userRole: { fontSize: 12, color: "#666", marginTop: 2 },
  menuItems: { marginBottom: 8 },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  menuItemHover: {
    // optional: subtle hover effect
  },
  menuItemText: { fontSize: 14, fontWeight: "500" },
  secondaryText: { fontSize: 13, color: "#999" },
  logoutBtn: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  logoutText: { fontSize: 14, fontWeight: "600", color: "#E53935" },
});
