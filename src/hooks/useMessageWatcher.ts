import { useEffect } from "react";
import * as FileSystem from "expo-file-system/legacy";

export default function useMessageWatcher(onMessageReceived) {
  useEffect(() => {
    const filePath = "/sdcard/Download/message_trigger.json";
    console.log("📂 Watching file:", filePath);
    console.log("👀 Message watcher started...");
    const interval = setInterval(async () => {
      try {
        const info = await FileSystem.getInfoAsync(filePath);
        if (info.exists) {
          const content = await FileSystem.readAsStringAsync(filePath);
          if (content.trim() !== "") {
            const { chatId, message } = JSON.parse(content);
            console.log("💬 New message detected:", message);
            onMessageReceived(chatId, message);
            await FileSystem.writeAsStringAsync(filePath, ""); // clear file
          }
        }
      } catch (e) {
        // file not ready yet — ignore
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);
}
