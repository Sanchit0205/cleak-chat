import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Bell, Menu, User } from "lucide-react-native";

export default function TopBar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Menu color="#000000ff" size={24} />
      </TouchableOpacity>

      {/* 🔹 Center CLEAK logo image */}
      <View style={styles.center}>
        <Image
          source={require("../../assets/images/cleak_logo.png")} // <-- your logo path
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.rightIcons}>
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Bell color="#000000ff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <User color="#000000ff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    elevation: 3, // optional subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  center: {
    flex: 1,
    alignItems: "flex-start",  // move left
    marginLeft: 40,             // adjust distance (try 30–50)
  },
  logoImage: {
    height: 40, // adjust as per logo
    width: 100,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
