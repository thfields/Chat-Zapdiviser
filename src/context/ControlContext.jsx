/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import { contactProfileImages, initialContacts } from '../data/Mocks';

// Create the ControlContext
export const ControlContext = createContext();

// Create the ControlContextProvider component
export const ControlContextProvider = ({ children }) => {

    // ControlPage e Contacts

    const [profileImages, setProfileImages] = useState(contactProfileImages);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [contactsMessages, setContactsMessages] = useState({});
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [highlightedMessageIndex, setHighlightedMessageIndex] = useState(-1);


    // CharHeader


    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });


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



    


    return (
        <ControlContext.Provider value={
            {
                profileImages,
                initialContacts,
                handleSearch,
                searchTerm,
                selectedContact,
                handleContactClick,
                toggleSidebar,
                toggleModalProfile,
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
                modalPosition,
                setModalPosition,
                setContactsMessages,

            }
        }>
            {children}
        </ControlContext.Provider>
    );
};