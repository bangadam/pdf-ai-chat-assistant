"use client";

import { CircleX, LoaderCircle, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetChatEngine } from "@/app/actions";
import ReactMarkdown from "react-markdown";

export interface ChatMessage {
  role: "human" | "ai";
  statement: string;
}

interface ChatProps {
  isLoading: boolean;
  loadingMessage: string;
  startChat: (input: string) => void;
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const Chat: React.FC<ChatProps> = ({
  isLoading,
  loadingMessage,
  messages,
  setMessages,
  startChat,
  setPage,
  setSelectedFile,
}) => {
  const [input, setInput] = useState<string>("");

  const messageClass = "rounded-3xl p-3 block relative max-w-max";
  const aiMessageClass = `text-start rounded-bl bg-gray-300 float-left text-gray-700 ${messageClass}`;
  const humanMessageClass = `text-end rounded-br bg-slate-400 text-gray-50 float-right ${messageClass}`;

  // Ref to the messages container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const closePDF = async () => {
    await resetChatEngine();
    setMessages([]);
    setSelectedFile(null);
    setPage(1);
  };

  const resetChat = async () => {
    await resetChatEngine();
    setMessages([]);
    setPage(1);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      startChat(input);
      setInput("");
    }
  };

  return (
    <div className="h-full flex flex-col justify-stretch w-[42vw] border-2 border-gray-200 rounded-xl p-2">
      <div className="flex justify-between mx-4">
        <span className="flex gap-2 mt-2 text-gray-500">
          {isLoading && <LoaderCircle className="animate-spin" />}
          {loadingMessage}
        </span>
        <span className="flex items-center gap-2">
          <Button
            onClick={resetChat}
            variant="default"
            title="Refresh Chat"
            disabled={isLoading}
          >
            <Trash size={16} className="text-white" />
          </Button>

          <Button
            onClick={closePDF}
            variant="default"
            title="Close PDF"
            disabled={isLoading}
          >
            <CircleX size={16} className="text-white" />
          </Button>
        </span>
      </div>

      <hr className="mt-3" />
      <div className="flex flex-col gap-3 flex-grow overflow-y-auto mt-3">
        {messages.map((message, index) => (
          <div key={index} className="w-full">
            <div
              className={
                message.role === "ai" ? aiMessageClass : humanMessageClass
              }
            >
              {message.role === "ai" ? (
                <ReactMarkdown>{message.statement}</ReactMarkdown>
              ) : (
                message.statement
              )}
            </div>
          </div>
        ))}
        {/* This div ensures scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 mx-2 items-center justify-between">
        <Input
          disabled={isLoading}
          className="text-md"
          type="text"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <div className="flex gap-2 items-center">
          <Button
            variant={"default"}
            disabled={isLoading}
            onClick={handleSendMessage}
          >
            Send
          </Button>
          {isLoading && <LoaderCircle className="animate-spin" />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
