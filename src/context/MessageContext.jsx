/* eslint-disable react/prop-types */
import { createContext } from 'react';

export const MessageContext = createContext();


export const MessageProvider = ({ children }) => {
    

    return (
        <MessageContext.Provider>
            {children}
        </MessageContext.Provider>
    );
};