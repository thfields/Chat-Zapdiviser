import { useContext } from 'react';
import { Chat, MagnifyingGlass } from "@phosphor-icons/react";
import { ControlContext } from '../../context/ControlContext';
import { useMessages } from '../../hooks/useMessages';
import { Checks } from "@phosphor-icons/react";

const Contacts = () => {
  const { 
    profileImages,  
    handleSearch, 
    searchTerm, 
    selectedContact, 
    filteredContacts,
    totalConversations,
    handleContactClick,
  } = useContext(ControlContext);

  const { getLastMessage } = useMessages();
  const MAX_MESSAGE_LENGTH = 30; // ou o número de caracteres que preferir

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-gray-50 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Chat size={24} className="text-green-500" />
          <h2 className="text-xl font-bold m-0">Mensagens
            <span className="ml-2 bg-gray-500 text-white px-2 py-1 rounded-full text-sm">{totalConversations}</span>
          </h2>
        </div>
      </div>
      
      <div className="relative mb-4">
        <MagnifyingGlass size={24} className="text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Procurar"
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 border rounded-lg w-full border-gray-500 focus:outline-none hover:border-green-500 text-gray-900 placeholder-gray-500"
        />
      </div>
      <ul className="flex-1 overflow-y-auto">
        {filteredContacts.map(contact => {
          const lastMessage = getLastMessage(contact);
          return (
            <li
              key={contact}
              onClick={() => handleContactClick(contact)}
              className={`p-2 cursor-pointer hover:bg-gray-200 border-b-2 hover:border-b-green-500 rounded-md ${selectedContact === contact ? 'bg-gray-200' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={profileImages[contact]}
                    alt={`${contact} profile`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <span>{contact}</span>
                    <div className="text-xs text-gray-500">
                      {lastMessage ? new Date(lastMessage.id).toLocaleString() : ""}
                    </div>
                    <p className="text-xs text-gray-500 flex items-center">
                      {lastMessage ? (
                        lastMessage.content.length > MAX_MESSAGE_LENGTH
                          ? `${lastMessage.content.slice(0, MAX_MESSAGE_LENGTH)}...`
                          : lastMessage.content
                      ) : []}
                      {lastMessage && <Checks size={15} className="ml-1" />}
                    </p>
                  </div>
                </div>
                
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Contacts;
