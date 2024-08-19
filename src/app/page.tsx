"use client";

import Chat, { ChatMessage } from "@/components/Chat";
import FileUpload from "@/components/FileUpload";
import Preview from "@/components/Preview";
import { useEffect, useState } from "react";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { processDocs, chat } from "@/app/actions";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const startChat = async (input: string) => {
    setLoadingMessage("AI is thinking...");
    setIsLoading(true);

    try {
      const updatedMessages: ChatMessage[] = [
        ...messages,
        { role: "human", statement: input },
      ];

      setMessages(updatedMessages);
      const chatResponse = await chat(input);

      if (!chatResponse) {
        setLoadingMessage("Failed to get a response from AI");
        return;
      }

      const { response, metadata } = chatResponse;

      const aiMessage: ChatMessage = { role: "ai", statement: response };
      setMessages([...updatedMessages, aiMessage]);

      if (metadata?.length) {
        setPage(metadata[0].loc.pageNumber);
      }

      setLoadingMessage("Got a response from AI");
    } catch (error) {
      console.error("Error during chat:", error);
      setLoadingMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const processPdfAsync = async () => {
      if (!selectedFile) return;

      setLoadingMessage("Processing PDF...");
      setIsLoading(true);

      try {
        const loader = new WebPDFLoader(selectedFile, {
          parsedItemSeparator: " ",
        });
        const loadedDocs = await loader.load();

        const lcDocs = loadedDocs.map((item) => ({
          pageContent: item.pageContent,
          metadata: item.metadata,
        }));

        await processDocs(lcDocs);
        setLoadingMessage("PDF processed successfully");
      } catch (error) {
        console.error("Error processing PDF:", error);
        setLoadingMessage("Failed to process PDF");
      } finally {
        setIsLoading(false);
      }
    };

    processPdfAsync();
  }, [selectedFile]);

  return (
    <main className="container mx-auto">
      {selectedFile ? (
        <div className="flex my-12 justify-evenly gap-2 h-[90vh]">
          <Chat
            isLoading={isLoading}
            loadingMessage={loadingMessage}
            messages={messages}
            setMessages={setMessages}
            startChat={startChat}
            setPage={setPage}
            setSelectedFile={setSelectedFile}
          />
          <Preview fileToPreview={selectedFile} page={page} />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <FileUpload setPage={setPage} setSelectFile={setSelectedFile} />
        </div>
      )}
    </main>
  );
}
