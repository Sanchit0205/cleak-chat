import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useRouter, useSegments } from "expo-router";
import {
  Home,
  PlusCircle,
  MessageSquare,
  BarChart2,
  Users,
} from "lucide-react-native";

const TABS = [
  { label: "Dashboard", route: "/(tabs)/", icon: Home },
  { label: "Create", route: "/(tabs)/create", icon: PlusCircle },
  { label: "Chats", route: "/(tabs)/chats", icon: MessageSquare },
  { label: "Analytics", route: "/(tabs)/analytics", icon: BarChart2 },
  { label: "Customers", route: "/(tabs)/customers", icon: Users },
];

// 🧩 Child component — can safely use hooks
function TabItem({ label, route, icon: Icon, active, onPress }) {
  const scaleAnim = useRef(new Animated.Value(active ? 1.2 : 1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: active ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [active]);

  // run once if active initially
  useEffect(() => {
    if (active) {
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  return (
    <TouchableOpacity style={styles.tab} onPress={onPress} activeOpacity={0.7}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Icon color={active ? "#007D69" : "#888"} size={26} />
      </Animated.View>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function BottomTab() {
  const router = useRouter();
  const segments = useSegments();
  const current = `/${segments.slice(0, 2).join("/")}`;

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TabItem
          key={tab.route}
          {...tab}
          active={current === tab.route}
          onPress={() => router.push(tab.route)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    height:50,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  activeLabel: {
    color: "#007D69",
    fontWeight: "600",
  },
});
