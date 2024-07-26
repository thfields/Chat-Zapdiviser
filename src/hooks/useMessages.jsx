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
        };
        setContactsMessages({
          ...contactsMessages,
          [selectedContact]: [...contactsMessages[selectedContact], newMessage],
        });
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
    
      const handleEdit = () => {
        console.log("Edit:", currentMessage);
        closeModal();
      };
    
      const handleDelete = () => {
        console.log("Delete:", currentMessage);
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