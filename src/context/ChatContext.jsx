/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

// Create the ChatContext
export const ChatContext = createContext();

// Create the ChatContextProvider component
export const ChatContextProvider = ({ children }) => {
    // State for storing chat messages
    const [messages, setMessages] = useState([]);

    // Function for adding a new message to the chat
    const addMessage = (message) => {
        setMessages([...messages, message]);
    };

    const putMessages = (messages) => {
        setMessages(messages);
    };

    const getMessages = () => {
        return messages;
    }

    const deleteMessages = () => {
        setMessages([]);
    }

    return (
        <ChatContext.Provider value={{ addMessage, putMessages, getMessages, deleteMessages }}>
            {children}
        </ChatContext.Provider>
    );
};