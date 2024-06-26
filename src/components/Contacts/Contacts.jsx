/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Chat, MagnifyingGlass } from "@phosphor-icons/react";

const Contacts = ({ contacts, contactProfileImages, selectedContact, onContactClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalConversations = filteredContacts.length;

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
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2 border rounded-lg w-full border-gray-500 focus:outline-none hover:border-green-500 text-gray-900 placeholder-gray-500"
        />
      </div>
      <ul className="flex-1 overflow-y-auto">
        {filteredContacts.map(contact => (
          <li
            key={contact}
            onClick={() => onContactClick(contact)}
            className={`p-2 cursor-pointer hover:bg-gray-200 border-b-2 hover:border-b-green-500 rounded-md ${selectedContact === contact ? 'bg-gray-200' : ''}`}
          >
            <div className="flex items-center">
              <img
                src={contactProfileImages[contact]}
                alt={`${contact} profile`}
                className="w-10 h-10 rounded-full mr-4"
              />
              <span>{contact}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
