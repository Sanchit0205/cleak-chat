import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Send, Smile, Paperclip } from "lucide-react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export default function MessageInput({ value, onChangeText, onSend }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Paperclip size={24} color="#888" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onSend}>
        <Send size={24} color="#007D69" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", padding: 8, backgroundColor: "#fff" },
  input: { flex: 1, marginHorizontal: 8, padding: 8, backgroundColor: "#f0f0f0", borderRadius: 20 },
});
