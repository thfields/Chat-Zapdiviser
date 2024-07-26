/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";
import InicialScreen from "../../pages/InicialSreen/InicialSreen";


const Chat = ({
  selectedContact,
  contactProfileImages,
  contactsMessages,
  onSendMessage,
  onFileChange,
  onSendAudio,
  toggleSidebar,
}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedMessageIndex, setHighlightedMessageIndex] = useState(-1);

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
    setSearchTerm("");
    setHighlightedMessageIndex(-1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const highlightedMessage = document.querySelector(".highlighted-message");
      if (highlightedMessage) {
        const index = parseInt(
          highlightedMessage.getAttribute("data-index"),
          10
        );
        setHighlightedMessageIndex(index);
      }
    }
  };

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

  const filteredMessages = contactsMessages[selectedContact]
    ? contactsMessages[selectedContact].map((msg, index) => ({
        ...msg,
        index,
      }))
    : [];

  useEffect(() => {
    if (highlightedMessageIndex !== -1) {
      const highlightedMessage = document.querySelector(
        `.message[data-index="${highlightedMessageIndex}"]`
      );
      if (highlightedMessage) {
        highlightedMessage.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [highlightedMessageIndex]);

  useEffect(() => {
    setSearchTerm("");
    setSearchVisible(false);
    setHighlightedMessageIndex(-1);
  }, [selectedContact]);

  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg shadow-md">
      {!selectedContact && <InicialScreen />}
      {selectedContact && (
        <>
          <ChatHeader
            selectedContact={selectedContact}
            contactProfileImages={contactProfileImages}
            toggleSearchBar={toggleSearchBar}
            searchVisible={searchVisible}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm} // Passando setSearchTerm para o ChatHeader
            handleSearchChange={handleSearchChange}
            handleSearchKeyPress={handleSearchKeyPress}
            toggleSidebar={toggleSidebar} // Passando a função de controle do sidebar
          />
          <ChatMessages
            filteredMessages={filteredMessages}
            highlightText={highlightText}
            searchTerm={searchTerm}
            highlightedMessageIndex={highlightedMessageIndex}
          />
          <ChatInput
            selectedContact={selectedContact}
            onSendMessage={onSendMessage}
            onFileChange={onFileChange}
            onSendAudio={onSendAudio}
          />
        </>
      )}
    </div>
  );
};

export default Chat;