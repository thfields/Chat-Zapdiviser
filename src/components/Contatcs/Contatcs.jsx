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
        <MagnifyingGlass size={24} className="text-gray-500 absolute left-3 top-2/4 transform -translate-y-1/2" />
        <input 
          type="search"  
          value={searchTerm}
          onChange={handleSearchChange}
          className="bg-purple-white shadow rounded border border-gray-300 focus:border-green-500 focus:outline-none p-3 pl-10 w-full" 
          placeholder="Pesquise um contato"
        />
      </div>

      <ul className="flex-grow overflow-y-auto">
        {filteredContacts.map((contact, index) => (
          <li key={index} onClick={() => onContactClick(contact)} className={`p-2 hover:bg-gray-300 rounded cursor-pointer flex items-center gap-3 border-b-2 ${selectedContact === contact ? 'border-green-500' : 'border-b-gray-300'}`}>
            <img src={contactProfileImages[contact]} alt={`${contact}'s Profile`} className="w-10 h-10 rounded-full" />
            <span className="truncate flex-grow">{contact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
