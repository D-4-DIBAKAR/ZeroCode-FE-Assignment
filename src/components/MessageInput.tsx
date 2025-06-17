import { useEffect, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputBase, Paper } from "@mui/material";

interface MessageInputProps {
  onSend: (text: string) => void;
  isLoading?: boolean;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (history.length === 0) return;
      const newIndex = Math.max(historyIndex - 1, 0);
      setText(history[newIndex]);
      setHistoryIndex(newIndex);
    } else if (e.key === "ArrowDown") {
      if (history.length === 0) return;
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setText(history[newIndex]);
      setHistoryIndex(newIndex);
    } else if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setHistory((prev) => [...prev, text.trim()]);
      setHistoryIndex(history.length);
      setText("");
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText((prev) => `${prev} ${transcript}`.trim());
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      className="flex items-center p-2 border-t dark:bg-gray-900 bg-white"
      elevation={0}
    >
      <InputBase
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="ml-2 flex-grow text-black dark:text-white"
        onKeyDown={handleKeyDown}
        sx={{ flex: 1 }}
      />

      <IconButton
        onClick={handleMicClick}
        color={isListening ? "error" : "primary"}
        title="Voice input"
      >
        {isListening ? <StopIcon className="animate-pulse" /> : <MicIcon />}
      </IconButton>

      <IconButton onClick={handleSend} color="primary" title="Send message">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
