const fs = require("fs");
const { execSync } = require("child_process");

const chatId = process.argv[2];
const message = process.argv[3];

if (!chatId || !message) {
  console.error("❌ Usage: node sendMessage.js <chatId> <message>");
  process.exit(1);
}

const payload = JSON.stringify({ chatId, message });

// Save locally
fs.writeFileSync("message_trigger.json", payload);
console.log(`📦 Created trigger file: ${payload}`);

// Push file to emulator
execSync(`adb push message_trigger.json /sdcard/Download/message_trigger.json`);
console.log("✅ Sent file to emulator storage");

// Optional: delete local file
fs.unlinkSync("message_trigger.json");

console.log(`📨 Sent message to chat ${chatId}: ${message}`);
