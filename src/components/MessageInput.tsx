// src/components/MessageInput.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Send, Paperclip } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: (content?: string, type?: "text" | "image") => void;
}

export default function MessageInput({ value, onChangeText, onSend }: Props) {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);

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
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom || 10,
          borderColor: isFocused ? "#007D69" : "#ddd", // focus border
        },
      ]}
    >
      <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
        <Paperclip size={24} color="#888" />
      </TouchableOpacity>

      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder="Type a message"
        value={value}
        onChangeText={onChangeText}
        multiline
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (value.trim()) {
            onSend(value, "text");
          }
        }}
        style={styles.iconButton}
      >
        <Send size={24} color="#007D69" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 19,
    // marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: "#f6f6f6ff",
    // borderRadius: 24,
    // borderWidth: 1,
    shadowColor: "#717171ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffffff",
    borderRadius: 30,
    fontSize: 16,
    maxHeight: 120,
    borderWidth: 1.6,
    borderColor: "#e4e4e4ff",
  },
  inputFocused: {
    borderColor: "#25D366",
  },
  iconButton: {
    padding: 10,
  },
});
