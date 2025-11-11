import React, { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Animated, StyleSheet } from "react-native";
import { X } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  customerName: string;
  templates: string[];
  onSend: (template: string) => void;
}

export default function SendTemplateMessage({ isVisible, onClose, customerName, templates, onSend }: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 20,
        tension: 100,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setSelectedTemplate(""));
    }
  }, [isVisible]);

  const handleSend = () => {
    if (selectedTemplate) {
      onSend(selectedTemplate);
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalBox, { transform: [{ scale: scaleAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Send Template Message</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Send to {customerName}</Text>

          {/* Template Selection */}
          <View style={styles.dropdown}>
            {templates.length ? (
              <Picker
                selectedValue={selectedTemplate}
                onValueChange={(itemValue) => setSelectedTemplate(itemValue)}
                style={{ height: 50 }}
              >
                <Picker.Item label="Select Template..." value="" color="#606060ff" />
                {templates.map((t, i) => (
                  <Picker.Item key={i} label={t} value={t} />
                ))}
              </Picker>
            ) : (
              <Text style={{ color: "#999" }}>⚠️ Failed to load templates</Text>
            )}
          </View>

          {/* Live Preview */}
          <View style={styles.previewBox}>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Live Preview</Text>
            <Text style={{ color: selectedTemplate ? "#000" : "#999" }}>
              {selectedTemplate || "Select a template to preview"}
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendBtn, !selectedTemplate && { opacity: 0.5 }]}
              onPress={handleSend}
              disabled={!selectedTemplate}
            >
              <Text style={styles.sendText}>Send Template</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 12 },
  dropdown: { marginBottom: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, overflow: "hidden" },
  previewBox: { padding: 12, borderRadius: 8, backgroundColor: "#F9FAFB", marginBottom: 12 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  cancelBtn: { flex: 1, marginRight: 8, padding: 12, borderRadius: 8, backgroundColor: "#eee" },
  cancelText: { textAlign: "center", fontWeight: "600" },
  sendBtn: { flex: 1, marginLeft: 8, padding: 12, borderRadius: 8, backgroundColor: "#22C55E" },
  sendText: { textAlign: "center", fontWeight: "600", color: "#fff" },
});
