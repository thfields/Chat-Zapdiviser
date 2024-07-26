/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';

// Create the ChatContext
export const ChatContext = createContext();

const contactProfileImages = {
    Vitor: "/src/assets/vitor.png",
    Rickson: "/src/assets/sem-foto.png",
    Thiago: "/src/assets/thiago.png",    
    Marcos: "/src/assets/marcos.png",
    Rodrigo: "/src/assets/rodrigo.png",
    Abner: "/src/assets/sem-foto.png",
};
  


// Create the ChatContextProvider component
export const ChatContextProvider = ({ children }) => {

    // ControlPage e Contacts
    const initialContacts = ["Vitor", "Rickson", "Thiago", "Marcos", "Rodrigo", "Abner"];
    const [profileImages, setProfileImages] = useState(contactProfileImages);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [contactsMessages, setContactsMessages] = useState({});
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  
    
    // Chat
    const [searchVisible, setSearchVisible] = useState(false);
    const [highlightedMessageIndex, setHighlightedMessageIndex] = useState(-1);


    // CharHeader
    const [searchActive, setSearchActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

     
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
    

    const filteredContacts = initialContacts.filter(contact =>
        contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const totalConversations = filteredContacts.length;
    

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        if (!contactsMessages[contact]) {
          setContactsMessages({
            ...contactsMessages,
            [contact]: [],
          });
        }
        if (window.innerWidth < 768) {
          setIsSidebarVisible(false); // Ocultar sidebar no modo mobile ao selecionar um contato
        }
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    

    const toggleModalProfile = () => {
        setIsModalProfileOpen(!isModalProfileOpen);
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
    


    return (
        <ChatContext.Provider value={
            {
                profileImages,
                initialContacts,
                handleSearch,
                searchTerm,
                selectedContact,
                handleContactClick,
                toggleSidebar,
                toggleModalProfile,
                handleSendMessage,
                handleFileChange,
                handleSendAudio,
                isModalProfileOpen, 
                setIsModalProfileOpen,
                isSidebarVisible,
                contactsMessages,
                filteredContacts,
                totalConversations,
                toggleSearchBar,
                searchVisible,
                setSearchVisible,
                highlightedMessageIndex,
                setHighlightedMessageIndex,
                handleSearchChange,
                handleSearchKeyPress,
                filteredMessages,
                searchActive,
                setSearchActive,
                isModalOpen,
                setIsModalOpen,
                modalPosition,
                setModalPosition,
                highlightText,
            

            }
        }>
            {children}
        </ChatContext.Provider>
    );
};