/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { DownloadSimple, Checks, CaretDown } from "@phosphor-icons/react";
import ModalMessage from "../Modals/ModalMessage";
import { useMessages } from "../../../hooks/useMessages";
import { ChatContext } from "../../../context/ChatContext";

const ChatMessages = () => {
  const {
    filteredMessages,
    messagesEndRef,
    isModalOpen,
    openModal,
  } = useContext(ChatContext);

  const {
    highlightText,
    searchMessage,
    highlightedMessageIndex,
  } = useMessages();

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
              className={`p-2 my-2 rounded relative ${index === highlightedMessageIndex ? "bg-yellow-200" : "bg-green-50"}`}
            >
              <div className="absolute top-0 right-0">
                <button onClick={(event) => openModal(message, event)}>
                  <CaretDown size={16} />
                </button>
              </div>
              <p className="whitespace-pre-wrap">
                {highlightText(message.content, searchMessage)}
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
      {isModalOpen && (
        <ModalMessage/>
      )}
    </div>
  );
};

export default ChatMessages;
