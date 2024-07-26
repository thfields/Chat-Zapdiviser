/* eslint-disable react/prop-types */
import {useContext } from "react";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";
import InicialScreen from "../../pages/InicialSreen/InicialSreen";
import { ControlContext } from '../../context/ControlContext';

const Chat = () => {

  const { 
    selectedContact,
  } = useContext(ControlContext);

 
  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg shadow-md">
      {!selectedContact && <InicialScreen />}
      {selectedContact && (
        <>
          <ChatHeader/>
          <ChatMessages/>
          <ChatInput/>
        </>
      )}
    </div>
  );
};

export default Chat;