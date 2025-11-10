import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ChatTopBar from "../../../src/components/ChatTopBar";
import ChatFilterTabs from "../../../src/components/ChatFilterTabs";
import SearchBar from "../../../src/components/SearchBar";
import ChatCard from "../../../src/components/ChatCard";

const DUMMY_CHATS = [
  { id: "1", name: "John Doe", lastMessage: "Hey, how are you?", time: "10:24 PM", unread: true },
  { id: "2", name: "CLEAK", lastMessage: "Your technician is coming tomorrow.", time: "09:30 AM", unread: false },
  { id: "3", name: "Alice", lastMessage: "Did you receive the files?", time: "Yesterday", unread: true },
];

export default function AllChats() {
  const [searchText, setSearchText] = useState("");

  const filteredChats = DUMMY_CHATS.filter(
    chat =>
      chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ChatTopBar title="Chats" />

      <ChatFilterTabs active="all" />

      <SearchBar
        placeholder="Search chats by name or message"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredChats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatCard {...item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
