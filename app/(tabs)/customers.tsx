import { View, Text, StyleSheet } from "react-native";

export default function CustomersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Customers Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 16, color: "#333" },
});
