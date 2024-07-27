import { ControlContext } from "../context/ControlContext";
import { ChatContext } from "../context/ChatContext";
import React, { useContext } from "react";

export const useMessages = () => {
  const {
    searchMessage, 
    highlightedMessageIndex,
    closeModal,
    currentMessage,
  } = useContext(ChatContext);
  
  const {
    selectedContact,
    contactsMessages,
    setContactsMessages,
  } = useContext(ControlContext);

  const highlightText = (text, highlight) => {
    if (!highlight) return <>{text}</>;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className="bg-yellow-300">
              {part}
            </mark>
          ) : (
            <React.Fragment key={index}>{part}</React.Fragment>
          )
        )}
      </>
    );
  };

  const handleSendMessage = (contact, message) => {
    const newMessage = {
      sender: "Me",
      content: message,
      file: null,
      id: Date.now(),
    };
    setContactsMessages({
      ...contactsMessages,
      [contact]: [...contactsMessages[contact], newMessage],
    });
  };

  const handleFileChange = (event, contact) => {
    const file = event.target.files[0];
    if (file && contact) {
      const newMessage = {
        sender: "Me",
        content: file.name,
        file: URL.createObjectURL(file),
        id: Date.now(),
      };
      setContactsMessages({
        ...contactsMessages,
        [contact]: [...contactsMessages[contact], newMessage],
      });
    }
  };

  const handleSendAudio = (audioBlob) => {
    const url = URL.createObjectURL(audioBlob);
    const newMessage = {
      sender: "Me",
      content: "Audio message",
      file: url,
      id: Date.now(),
    };
    setContactsMessages({
      ...contactsMessages,
      [selectedContact]: [...contactsMessages[selectedContact], newMessage],
    });
  };

  const handleReply = () => {
    if (currentMessage) {
      handleSendMessage(selectedContact, `Reply to: ${currentMessage.content}`);
    }
    closeModal();
  };

  const handleForward = () => {
    if (currentMessage) {
      handleSendMessage(selectedContact, `Forward: ${currentMessage.content}`);
    }
    closeModal();
  };

  const handleCopy = () => {
    if (currentMessage) {
      navigator.clipboard.writeText(currentMessage.content);
    }
    closeModal();
  };

  const handleEdit = () => {
    if (currentMessage) {
      const updatedMessages = contactsMessages[selectedContact].map((msg) =>
        msg.id === currentMessage.id ? { ...msg, content: `Edited: ${msg.content}` } : msg
      );
      setContactsMessages({
        ...contactsMessages,
        [selectedContact]: updatedMessages,
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    if (currentMessage) {
      const updatedMessages = contactsMessages[selectedContact].filter(
        (msg) => msg.id !== currentMessage.id
      );
      setContactsMessages({
        ...contactsMessages,
        [selectedContact]: updatedMessages,
      });
    }
    closeModal();
  };

  return {
    highlightText,
    searchMessage,
    highlightedMessageIndex,
    closeModal,
    handleReply,
    handleForward,
    handleCopy,
    handleEdit,
    handleDelete,
    handleSendMessage,
    handleFileChange,
    handleSendAudio,
  };
};
