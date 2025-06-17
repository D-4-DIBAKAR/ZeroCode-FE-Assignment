import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PromptTemplates from "./PromptTemplates";
import { Button } from "@mui/material";
import jsPDF from "jspdf";

export interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const bottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setShowScrollButton(!bottom);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSend = (message: string) => {
    const timeNow = new Date().toLocaleTimeString();
    const userMsg: ChatMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: timeNow,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        text: `Bot says: "${message}"`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    messages.forEach((msg, index) => {
      const sender = msg.sender === "user" ? "You" : "Bot";
      doc.text(`${sender}: ${msg.text}`, 10, 10 + index * 10);
    });
    doc.save("chat-history.pdf");
  };
  const handleEditMessage = (id: number, newText: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg))
    );
  };

  const handleDeleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex justify-center gap-2 p-2 bg-gray-100 dark:bg-gray-800">
        <Button variant="outlined" size="small" onClick={handleClear}>
          Clear Chat
        </Button>
        <Button variant="outlined" size="small" onClick={handleExportPDF}>
          Export PDF
        </Button>
      </div>
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900 relative"
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.text}
            sender={msg.sender}
            timestamp={msg.timestamp}
            onEdit={
              msg.sender === "user"
                ? () => {
                    const newText = prompt("Edit your message:", msg.text);
                    if (newText !== null && newText.trim() !== "") {
                      handleEditMessage(msg.id, newText);
                    }
                  }
                : undefined
            }
            onDelete={
              msg.sender === "user"
                ? () => handleDeleteMessage(msg.id)
                : undefined
            }
          />
        ))}
        {isLoading && (
          <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">
            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-150"></span>
            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-300"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
        {showScrollButton && (
          <button
            className="fixed bottom-20 right-4 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 w-10 h-10 flex items-center justify-center"
            onClick={scrollToBottom}
          >
            <ArrowDownwardIcon />
          </button>
        )}
      </div>
      <PromptTemplates onSelect={handleSend} />
      <MessageInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
