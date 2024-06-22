/* eslint-disable react/prop-types */
// ChatMessages.jsx

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
    <div className="flex flex-col flex-grow overflow-y-auto">
      <div className="flex-1 min-h-0">
        <div className="flex flex-col justify-end h-full overflow-y-auto">
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
    </div>
  );
};

export default ChatMessages;
