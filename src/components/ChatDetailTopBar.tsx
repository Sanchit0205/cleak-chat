// src/components/ChatDetailTopBar.tsx
import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal } from "react-native";
import { ArrowLeft, Trash2, FileText, ShoppingCart } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { useChatStore } from "../store/chatStore";
import SendTemplateMessage from "./SendTemplateMessage";
import CreateSale from "./CreateSale"; // Adjust the path if your file is in a different folder


interface Props {
  title: string;
  subtitle?: string;
  avatar?: string;
}

export default function ChatDetailTopBar({ title, subtitle }: Props) {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { deleteChat } = useChatStore();
  const [showModal, setShowModal] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const templates = ["Hello {{name}}, your order is ready!", "Hi {{name}}, your invoice is attached."];

  const [showCreateSale, setShowCreateSale] = useState(false);
const productsList = [
  { name: "Product A", price: 100, stock: 10 },
  { name: "Product B", price: 200, stock: 5 },
];


  const openModal = () => {
    setShowModal(true);
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 6, tension: 100 }).start();
  };

  const closeModal = () => {
    Animated.timing(scaleAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setShowModal(false));
  };

  const handleDelete = async () => {
    await deleteChat(id as string);
    closeModal();
    router.back();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{title[0]}</Text>
          </View>

          <View>
            <Text style={styles.name}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>

        <View style={styles.right}>
          <TouchableOpacity onPress={() => setShowCreateSale(true)}>
            <ShoppingCart size={22} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={() => setShowTemplateModal(true)}>
            <FileText size={22} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={openModal}>
            <Trash2 size={22} color="#E53935" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Template Modal */}
      <SendTemplateMessage
        isVisible={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        customerName={title}
        templates={templates}
        onSend={(template) => alert(`Template sent: ${template}`)}
      />

      <CreateSale
        isVisible={showCreateSale}
        onClose={() => setShowCreateSale(false)}
        customerName={title}
        productsList={productsList}
        onCreateBill={(data) => console.log("Bill Created:", data)}
      />

      {/* Delete Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalBox, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.modalTitle}>Delete chat with {title}?</Text>
            <Text style={styles.modalSubtitle}>This will permanently remove all messages for this conversation.</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={closeModal}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { height: 70, backgroundColor: "#F0F2F5", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, borderBottomWidth: 1, borderColor: "#ddd" },
  left: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#22C55E", justifyContent: "center", alignItems: "center", marginRight: 8 },
  avatarText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  backButton: { marginRight: 8 },
  name: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 12, color: "#666" },
  right: { flexDirection: "row", alignItems: "center" },
  iconBtn: { marginLeft: 12 },

  // Delete modal styles
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  modalBox: { width: "80%", backgroundColor: "#fff", borderRadius: 16, padding: 20, shadowColor: "#000", shadowOpacity: 0.2, shadowOffset: { width: 0, height: 4 }, shadowRadius: 6, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6, textAlign: "center" },
  modalSubtitle: { fontSize: 13, color: "#666", textAlign: "center", marginBottom: 16 },
  modalActions: { flexDirection: "row", justifyContent: "space-between" },
  cancelBtn: { flex: 1, marginRight: 8, backgroundColor: "#eee", padding: 10, borderRadius: 10 },
  cancelText: { textAlign: "center", fontWeight: "600" },
  deleteBtn: { flex: 1, marginLeft: 8, backgroundColor: "#E53935", padding: 10, borderRadius: 10 },
  deleteText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
