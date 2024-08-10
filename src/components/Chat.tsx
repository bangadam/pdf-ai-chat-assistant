"use client";

import { CircleX, LoaderCircle, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetChatEngine } from "@/app/actions";

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
  const humanMessageClass = `text-end rounded-br bg-blue-400 text-gray-50 float-right ${messageClass}`;

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

  return (
    <div className="h-full flex flex-col justify-stretch w-[42vw] border-2 border-gray-200 rounded-xl p-2">
      <div className="flex gap2 justify-between mx-4">
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
      <div className="flex flex-col justify-end gap-3 flex-grow">
        <div className="flex-grow h-max mt-4">
          {messages.map((message, index) => {
            return (
              <div className="w-full" key={index}>
                <div
                  className={
                    message.role === "ai" ? aiMessageClass : humanMessageClass
                  }
                >
                  {message.statement}
                </div>
              </div>
            );
          })}

          <div className="flex gap-2 mx-2 items-center justify-between">
            <Input
              disabled={isLoading}
              className="text-md"
              type="text"
              placeholder="Type something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex gap-2 items-center">
              <Button
                onClick={() => {
                  startChat(input);
                  setInput("");
                }}
                variant="default"
                disabled={isLoading}
              >
                Send
              </Button>
              {isLoading && <LoaderCircle className="animate-spin" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
