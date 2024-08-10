import { CircleX, LoaderCircle, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

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
  setMesasges,
  startChat,
  setPage,
  setSelectedFile,
}) => {
  const [input, setInput] = useState<string>("");

  const closePDF = async () => {
    await resetChatEngine();
    setMesasges([]);
    setSelectedFile(null);
    setPage(1);
  };

  const resetChat = async () => {
    await resetChatEngine();
    setMesasges([]);
    setPage(1);
  };

  return (
    <div className="h-full flex flex-col justify-stretch w-[42vw] border-2 border-gray-200 rounded-xl p-2">
      <div className="flex gap-2 justify-between mx-4">
        <span className="flex gap-2 mt-2 text-gray-500">
          {isLoading && <LoaderCircle className="animate-spin" />}
          {loadingMessage}
        </span>
        <span className="flex items-center">
          <Button
            onClick={resetChat}
            variant="secondary"
            title="Refresh Chat"
            disabled={isLoading}
          >
            <Trash size={16} className="text-gray-400" />
          </Button>

          <Button
            onClick={closePDF}
            variant="destructive"
            title="Close PDF"
            disabled={isLoading}
          >
            <CircleX size={16} className="text-gray-400" />
          </Button>
        </span>
      </div>
    </div>
  );
};
