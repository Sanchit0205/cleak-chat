// src/components/MessageInput.tsx
import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Send, Paperclip } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: (content?: string, type?: "text" | "image") => void;
}

export default function MessageInput({ value, onChangeText, onSend }: Props) {
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        onSend(uri, "image");
      }
    } catch (e) {
      Alert.alert("Error", "Failed to pick image.");
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Paperclip size={24} color="#888" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={() => onSend(value, "text")}>
        <Send size={24} color="#007D69" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", padding: 8, backgroundColor: "#fff" },
  input: {
    flex: 1,
    marginHorizontal: 10,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
  },
});
