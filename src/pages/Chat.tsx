import ChatWindow, { type ChatMessage } from "../components/ChatWindow";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { saveAs } from "file-saver";
import { useState } from "react";
export default function Chat() {
  const navigate = useNavigate();
  const [messages] = useState<ChatMessage[]>([]);
  const exportChat = () => {
    const text = messages
      .map((m) => `${m.sender.toUpperCase()}: ${m.text}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "chat.txt");
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Zerocode Chat
        </h1>
        <div className="flex gap-3">
          <ThemeToggle />
          <button
            onClick={exportChat}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Export Chat
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <ChatWindow />
    </div>
  );
}
