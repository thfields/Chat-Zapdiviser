/* eslint-disable react/prop-types */
import { DownloadSimple } from "@phosphor-icons/react";
import { useRef, useEffect } from "react";

const ChatMessages = ({ filteredMessages, highlightText, searchTerm, highlightedMessageIndex }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-grow p-4 overflow-y-auto">
      <div className="max-h-[calc(100vh - 16rem)] overflow-auto">
        {filteredMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "Me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 my-2 rounded ${
                index === highlightedMessageIndex ? "bg-yellow-200" : "bg-gray-200"
              }`}
            >
              <p className="whitespace-pre-wrap">
                {highlightText(message.content, searchTerm)}
              </p>
              {message.file && (
                <a
                  href={message.file}
                  download
                  className="text-green-500 hover:underline mt-1 block"
                >
                  <DownloadSimple size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
