// src/components/ContactDetailsModal.tsx
import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { X } from "lucide-react-native";

interface Contact {
  name: string;
  phone: string;
  email?: string;
  optIn?: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  contact?: Contact;
}

export default function ContactDetailsModal({
  visible,
  onClose,
  contact = {
    name: "CLEAK",
    phone: "917387567342",
    email: "Not provided",
    optIn: "UNKNOWN",
  },
}: Props) {
  const { name, phone, email, optIn } = contact;
  const initial = name.charAt(0).toUpperCase();

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Contact Details</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Contact Summary */}
            <View style={styles.summary}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
              <View style={styles.summaryText}>
                <Text style={styles.contactName}>{name}</Text>
                <Text style={styles.phoneNumber}>{phone}</Text>
                <View style={styles.optInBadge}>
                  <Text style={styles.optInText}>{optIn}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Contact Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <Text>Email: {email}</Text>
              <Text>Phone: {phone}</Text>
            </View>

            {/* Custom Attributes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Custom Attributes</Text>
              <Text style={styles.placeholderText}>No data</Text>
            </View>

            {/* Campaign History */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Campaign History</Text>
              <Text style={styles.placeholderText}>No campaign history</Text>
            </View>
          </ScrollView>
        </View>
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
  container: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  summaryText: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  phoneNumber: {
    color: "#555",
    marginTop: 2,
  },
  optInBadge: {
    marginTop: 4,
    backgroundColor: "red",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  optInText: {
    color: "#fff",
    fontSize: 12,
  },
  editButton: {
    backgroundColor: "#007D69",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  placeholderText: {
    fontStyle: "italic",
    color: "#888",
  },
});
