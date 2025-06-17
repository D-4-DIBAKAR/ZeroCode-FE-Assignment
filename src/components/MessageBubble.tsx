import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function MessageBubble({
  message,
  sender,
  timestamp,
  onEdit,
  onDelete,
}: {
  message: string;
  sender: "user" | "bot";
  timestamp?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const isUser = sender === "user";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-2 items-end`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isUser && (
        <Avatar
          sx={{ width: 32, height: 32, mr: 1, fontSize: 16 }}
          variant="rounded"
        >
          🤖
        </Avatar>
      )}
      <div className="relative">
        <div
          className={`max-w-xs p-2 rounded-lg shadow-md text-sm ${
            isUser
              ? "bg-blue-500 text-white ml-auto rounded-br-none"
              : "bg-gray-200 text-black mr-auto rounded-bl-none"
          }`}
        >
          <p>{message}</p>
          {timestamp && (
            <div className="text-xs text-right mt-1 opacity-60 ">
              {timestamp}
            </div>
          )}
        </div>

        {isUser && isHovered && (
          <div className="absolute top-15 right-0 flex gap-1 ">
            <IconButton size="small" onClick={onEdit} title="Edit">
              <EditIcon fontSize="small" className="dark:text-gray-400" />
            </IconButton>
            <IconButton size="small" onClick={onDelete} title="Delete">
              <DeleteIcon fontSize="small" className="dark:text-gray-400" />
            </IconButton>
          </div>
        )}
      </div>
      {isUser && (
        <Avatar
          sx={{ width: 32, height: 32, ml: 1, fontSize: 16 }}
          variant="rounded"
        >
          🧑
        </Avatar>
      )}
    </div>
  );
}
