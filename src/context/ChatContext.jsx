/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext, useRef } from 'react';
import { ControlContext } from '../context/ControlContext';


export const ChatContext = createContext();


export const ChatProvider = ({ children }) => {

  const { 
    selectedContact ,
    highlightedMessageIndex,
    setHighlightedMessageIndex,
    contactsMessages,
  } = useContext(ControlContext);

 

    const [searchVisible, setSearchVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(null); 
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); 
    const [searchMessage, setSearchMessage] = useState("");

    const [editingMessageId, setEditingMessageId] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    const messagesEndRef = useRef(null);

    const toggleSearchBar = () => {
      setSearchVisible(!searchVisible);
      setSearchMessage("");
      setHighlightedMessageIndex(-1);
    };
  
    const handleSearchChange = (event) => {
      setSearchMessage(event.target.value);
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
      setSearchMessage("");
      setSearchVisible(false);
      setHighlightedMessageIndex(-1);
    }, [selectedContact]);

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

   
    return (
        <ChatContext.Provider value={
            {
                searchVisible,
                toggleSearchBar,
                searchMessage,
                setSearchMessage,
                handleSearchChange,
                handleSearchKeyPress,
                highlightedMessageIndex,
                setHighlightedMessageIndex,
                filteredMessages,
                messagesEndRef,
                openModal,
                closeModal,
                isModalOpen,
                currentMessage,
                modalPosition,
                editingMessageId,
                setEditingMessageId,
                messageInput,
                setMessageInput,
              
            }
        }>
            {children}
        </ChatContext.Provider>
    );
};