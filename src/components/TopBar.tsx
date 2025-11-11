import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Bell, Menu, User } from "lucide-react-native";
import { useState } from "react";
import SideDrawer from "./SideDrawer";
import UserMenuPopup from "./UserMenuPopup";

export default function TopBar() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userPopupVisible, setUserPopupVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Menu color="#000000ff" size={24} />
        </TouchableOpacity>

        <View style={styles.center}>
          <Image
            source={require("../../assets/images/cleak_logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Bell color="#000000ff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserPopupVisible(!userPopupVisible)}>
            <User color="#000000ff" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <SideDrawer
        isVisible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />

      <UserMenuPopup
        isVisible={userPopupVisible}
        onClose={() => setUserPopupVisible(false)}
        userName="Sanchit"
        userRole="User"
        onLogout={() => alert("Logged out!")}
        onNavigate={(screen) => alert(`Navigate to ${screen}`)}
      />
    </>
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
    paddingTop: 26,
    paddingBottom:26,
    // elevation: 3, // optional subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  center: {
    flex: 1,
    alignItems: "flex-start",  // move left
    marginLeft: 20,             // adjust distance (try 30–50)
  },
  logoImage: {
    height: 70, // adjust as per logo
    width: 120,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    width: 80,
  },
});
