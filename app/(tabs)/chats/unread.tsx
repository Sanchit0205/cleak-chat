import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ChatTopBar from "../../../src/components/ChatTopBar";
import ChatFilterTabs from "../../../src/components/ChatFilterTabs";
import SearchBar from "../../../src/components/SearchBar";
import ChatCard from "../../../src/components/ChatCard";
import { useChatStore } from "../../../src/store/chatStore";

export default function UnreadChats() {
  const { chats, loadChats } = useChatStore();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadChats();
  }, []);

  const unreadChats = chats.filter((chat) => chat.unread);
  const filteredChats = unreadChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ChatTopBar title="Chats" />
      <ChatFilterTabs active="unread" />

      <SearchBar
        placeholder="Search chats by name or message"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatCard {...item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
