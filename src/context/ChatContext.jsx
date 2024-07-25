/* eslint-disable react/prop-types */
import { createContext } from 'react';

// Create the ChatContext
export const ChatContext = createContext();

// Create the ChatContextProvider component
export const ChatContextProvider = ({ children }) => {


    return (
        <ChatContext.Provider>
            {children}
        </ChatContext.Provider>
    );
};