/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";

const Chat = ({
  selectedContact,
  contactProfileImages,
  contactsMessages,
  onSendMessage,
  onFileChange,
  onSendAudio,
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
    if (!highlight) return <>{text}</>; // Retorna o texto completo se não houver termo de pesquisa

    // Cria uma expressão regular global (gi) para encontrar todas as ocorrências do termo de pesquisa
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
        index, // Adicionando o índice da mensagem para referência
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
    setSearchTerm(""); // Limpar o termo de pesquisa ao mudar de contato
    setSearchVisible(false); // Esconder a barra de pesquisa ao mudar de contato
    setHighlightedMessageIndex(-1); // Limpar o índice da mensagem destacada ao mudar de contato
  }, [selectedContact]);

  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg shadow-md">
      <ChatHeader
        selectedContact={selectedContact}
        contactProfileImages={contactProfileImages}
        toggleSearchBar={toggleSearchBar}
        searchVisible={searchVisible}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleSearchKeyPress={handleSearchKeyPress}
      />
      <div className="flex-grow overflow-hidden">
        <ChatMessages
          filteredMessages={filteredMessages}
          highlightText={highlightText}
          searchTerm={searchTerm}
          highlightedMessageIndex={highlightedMessageIndex} // Passando o índice da mensagem destacada
        />
      </div>
      {selectedContact && (
        <ChatInput
          selectedContact={selectedContact}
          onSendMessage={onSendMessage}
          onFileChange={onFileChange}
          onSendAudio={onSendAudio}
        />
      )}
    </div>
  );
};

export default Chat;
