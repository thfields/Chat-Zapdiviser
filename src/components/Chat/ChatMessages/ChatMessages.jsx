/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { DownloadSimple } from "@phosphor-icons/react";

const ChatMessages = ({ filteredMessages, highlightText, searchTerm, highlightedMessageIndex }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHighlightedMessage = (index) => {
    const highlightedMessage = document.querySelector(`.message[data-index="${index}"]`);
    if (highlightedMessage) {
      highlightedMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (highlightedMessageIndex !== -1) {
      scrollToHighlightedMessage(highlightedMessageIndex);
    }
  }, [highlightedMessageIndex]);

  return (
    <div className="flex-grow p-4 overflow-y-auto max-h-[calc(100vh - 10rem)]">
      <div className="overflow-auto">
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
