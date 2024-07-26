/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, useContext } from "react";
import { DownloadSimple, Checks, CaretDown } from "@phosphor-icons/react";
import ModalMessage from "../Modals/ModalMessage";
import { ControlContext } from "../../../context/ControlContext";

const ChatMessages = ({ filteredMessages, highlightText, highlightedMessageIndex }) => {

  const { searchTerm } = useContext(ControlContext);




  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
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

  const openModal = (message, event) => {
    const rect = event.target.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const modalWidth = 150; // Largura aproximada do modal

    let left = rect.left + window.scrollX;

    if (windowWidth - rect.right < modalWidth) {
      left = rect.left + window.scrollX - modalWidth;
    }

    setModalPosition({ top: rect.top + window.scrollY, left });
    setCurrentMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMessage(null);
  };

  const handleReply = () => {
    console.log("Reply to:", currentMessage);
    closeModal();
  };

  const handleForward = () => {
    console.log("Forward:", currentMessage);
    closeModal();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessage.content);
    closeModal();
  };

  const handleDelete = () => {
    console.log("Delete:", currentMessage);
    closeModal();
  };

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
      {isModalOpen && (
        <ModalMessage
          onClose={closeModal}
          onReply={handleReply}
          onForward={handleForward}
          onCopy={handleCopy}
          onDelete={handleDelete}
          position={modalPosition}
        />
      )}
    </div>
  );
};

export default ChatMessages;
