/* eslint-disable react/prop-types */
import { createContext } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from './ChatContext';
import { ControlContext } from './ControlContext';

export const MessageContext = createContext();


export const MessageProvider = ({ children }) => {
    
    const {
        highlightText, 
        searchMessage, 
        highlightedMessageIndex 
      } = useContext(ChatContext);
    
      const {
        selectedContact,
        contactsMessages,
      } = useContext(ControlContext);
    
    
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [currentMessage, setCurrentMessage] = useState(null);
      const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
      const messagesEndRef = useRef(null);
    
    
      const filteredMessages = contactsMessages[selectedContact]
        ? contactsMessages[selectedContact].map((msg, index) => ({
            ...msg,
            index,
          }))
        : [];
    
    
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
    
      const handleEdit = () => {
        console.log("Edit:", currentMessage);
        closeModal();
      };
    
      const handleDelete = () => {
        console.log("Delete:", currentMessage);
        closeModal();
      };

    return (
        <MessageContext.Provider value={
            {
                highlightText,
                searchMessage,
                highlightedMessageIndex,
                filteredMessages,
                messagesEndRef,
                isModalOpen,
                openModal,
                closeModal,
                modalPosition,
                handleReply,
                handleForward,
                handleEdit,
                handleCopy,
                handleDelete,
            }
        }
        >
            {children}
        </MessageContext.Provider>
    );
};