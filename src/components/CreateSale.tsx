// src/components/CreateSale.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { X } from "lucide-react-native";

interface ProductItem {
  productName: string;
  quantity: number;
  price: number;
  stock: number;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  customerName: string;
  productsList: { name: string; price: number; stock: number }[];
  onCreateBill: (data: any) => void;
}

export default function CreateSale({
  isVisible,
  onClose,
  customerName,
  productsList,
  onCreateBill,
}: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const [saleType, setSaleType] = useState<"Retail" | "Wholesale">("Retail");
  const [items, setItems] = useState<ProductItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: customerName,
    phone: "",
    altPhone: "",
    email: "",
    address: "",
    pincode: "",
  });
  const [gstRate, setGstRate] = useState(0);
  const [paymentType, setPaymentType] = useState<
    "UPI" | "Cash" | "Bank" | "Other"
  >("UPI");
  const [utr, setUtr] = useState("");

  useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
        tension: 100,
      }).start();
    } else {
      Animated.timing(scaleAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [isVisible]);

  const addItem = () =>
    setItems([...items, { productName: "", quantity: 1, price: 0, stock: 0 }]);

  const updateItem = (index: number, field: keyof ProductItem, value: any) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const gstAmount = (subtotal * gstRate) / 100;
  const total = subtotal + gstAmount;

  const handleCreateBill = () => {
    onCreateBill({ saleType, items, customerInfo, gstRate, paymentType, utr, total });
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalBox, { transform: [{ scale: scaleAnim }] }]}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Sale</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Add sale for {customerName}</Text>

          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            
            {/* Sale Type Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sale Type</Text>
              <View style={styles.saleType}>
                {["Retail", "Wholesale"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.saleTypeBtn,
                      saleType === type && styles.saleTypeSelected,
                    ]}
                    onPress={() => setSaleType(type as "Retail" | "Wholesale")}
                  >
                    <Text style={{ fontWeight: saleType === type ? "bold" : "normal" }}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Product Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Products</Text>
              {items.map((item, i) => (
                <View key={i} style={styles.productBox}>
                  <Text style={styles.productLabel}>Product {i + 1}</Text>
                  <TextInput
                    placeholder="Product Name"
                    value={item.productName}
                    onChangeText={(t) => updateItem(i, "productName", t)}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Quantity"
                    keyboardType="number-pad"
                    value={String(item.quantity)}
                    onChangeText={(t) => updateItem(i, "quantity", Number(t))}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Price (₹)"
                    keyboardType="number-pad"
                    value={String(item.price)}
                    onChangeText={(t) => updateItem(i, "price", Number(t))}
                    style={styles.input}
                  />
                  <Text style={styles.stockText}>Stock: {item.stock}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.addBtn} onPress={addItem}>
                <Text style={styles.addBtnText}>+ Add Another Product</Text>
              </TouchableOpacity>
            </View>

            {/* Customer Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Information</Text>
              {Object.entries(customerInfo).map(([key, val]) => (
                <TextInput
                  key={key}
                  placeholder={key}
                  value={val}
                  onChangeText={(text) => setCustomerInfo({ ...customerInfo, [key]: text })}
                  style={styles.input}
                />
              ))}
            </View>

            {/* Bill Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bill Summary</Text>
              <View style={styles.summaryBox}>
                <Text>Sale Type: {saleType}</Text>
                <Text>Items: {items.length}</Text>
                <Text>Subtotal: ₹{subtotal.toFixed(2)}</Text>
                <Text>GST ({gstRate}%): ₹{gstAmount.toFixed(2)}</Text>
                <Text style={{ fontWeight: "bold" }}>Total: ₹{total.toFixed(2)}</Text>
              </View>

              {/* GST & Payment */}
              <TextInput
                placeholder="GST Rate (%)"
                keyboardType="number-pad"
                value={String(gstRate)}
                onChangeText={(t) => setGstRate(Number(t))}
                style={styles.input}
              />
              <TextInput
                placeholder="Payment Type (UPI/Cash/Bank/Other)"
                value={paymentType}
                onChangeText={(t) => setPaymentType(t as any)}
                style={styles.input}
              />
              {(paymentType === "UPI" || paymentType === "Bank") && (
                <TextInput
                  placeholder="UTR / Transaction ID"
                  value={utr}
                  onChangeText={setUtr}
                  style={styles.input}
                />
              )}
            </View>

          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.createBtn, items.length === 0 && { opacity: 0.5 }]}
            disabled={items.length === 0}
            onPress={handleCreateBill}
          >
            <Text style={styles.createBtnText}>Create Bill – ₹{total.toFixed(2)}</Text>
          </TouchableOpacity>
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
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    maxHeight: "90%",
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 12 },
  scrollArea: { marginBottom: 12 },

  // Section Styles
  section: { marginBottom: 12, padding: 8, backgroundColor: "#F9FAFB", borderRadius: 12 },
  sectionTitle: { fontWeight: "bold", marginBottom: 8, fontSize: 16 },

  // Sale Type
  saleType: { flexDirection: "row" },
  saleTypeBtn: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 4,
  },
  saleTypeSelected: { backgroundColor: "#D1FAE5", borderColor: "#22C55E" },

  // Products
  productBox: { marginBottom: 8, padding: 8, borderWidth: 1, borderColor: "#eee", borderRadius: 8 },
  productLabel: { marginBottom: 4, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 6, backgroundColor: "#fff" },
  stockText: { fontSize: 12, color: "#666", marginBottom: 6 },
  addBtn: { padding: 12, backgroundColor: "#22C55E", borderRadius: 8, marginBottom: 8 },
  addBtnText: { textAlign: "center", color: "#fff", fontWeight: "600" },

  // Bill Summary
  summaryBox: { padding: 8, borderWidth: 1, borderColor: "#eee", borderRadius: 8 },

  // Submit Button
  createBtn: { padding: 14, backgroundColor: "#2563EB", borderRadius: 12 },
  createBtnText: { textAlign: "center", color: "#fff", fontWeight: "bold", fontSize: 16 },
});
