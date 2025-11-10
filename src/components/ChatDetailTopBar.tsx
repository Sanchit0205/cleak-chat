// src/components/ChatDetailTopBar.tsx
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ArrowLeft, Trash2, FileText, ShoppingCart } from "lucide-react-native";

interface Props {
  name: string;
  subtitle?: string;
}

export default function ChatDetailTopBar({ name, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.iconBtn}>
          <ShoppingCart size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <FileText size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Trash2 size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  left: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: 20, marginHorizontal: 8 },
  name: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 12, color: "#666" },
  right: { flexDirection: "row", alignItems: "center" },
  iconBtn: { marginLeft: 12 },
});
