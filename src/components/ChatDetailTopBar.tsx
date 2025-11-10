// src/components/ChatDetailTopBar.tsx
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ArrowLeft, Trash2, FileText, ShoppingCart } from "lucide-react-native";
import { useRouter } from "expo-router";

interface Props {
  title: string;
  subtitle?: string;
  avatar?: string;
}

export default function ChatDetailTopBar({ title, subtitle, avatar }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>

        <Image
          source={{
            uri: avatar || "https://via.placeholder.com/40",
          }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.name}>{title}</Text>
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
  backButton: { marginRight: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  name: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 12, color: "#666" },
  right: { flexDirection: "row", alignItems: "center" },
  iconBtn: { marginLeft: 12 },
});
