/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState, useContext } from 'react';
import { ControlContext } from '../context/ControlContext';

export const ChatContext = createContext();


export const ChatProvider = ({ children }) => {

  const { selectedContact } = useContext(ControlContext);

    const [searchVisible, setSearchVisible] = useState(false);
    const [searchMessage, setSearchMessage] = useState("");
    const [highlightedMessageIndex, setHighlightedMessageIndex] = useState(-1);

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
   
    return (
        <ChatContext.Provider value={
            {
                searchVisible,
                toggleSearchBar,
                searchMessage,
                setSearchMessage,
                handleSearchChange,
                handleSearchKeyPress,
                highlightText,
                highlightedMessageIndex,
                setHighlightedMessageIndex
            }
        }>
            {children}
        </ChatContext.Provider>
    );
};