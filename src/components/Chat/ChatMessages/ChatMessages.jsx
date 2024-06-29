/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { DownloadSimple, Checks  } from "@phosphor-icons/react";

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
    <div className="bg-gray-200 flex-grow p-4 overflow-y-auto h-32">
      <div className="overflow-auto">
        {filteredMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "Me" ? "justify-end" : "justify-start"}`}
            data-index={index}
          >
            <div
              className={`p-2 my-2 rounded ${index === highlightedMessageIndex ? "bg-yellow-200" : "bg-green-50"}`}
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
              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                <span>{new Date().toLocaleString()}</span>
                <Checks size={15} />
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
