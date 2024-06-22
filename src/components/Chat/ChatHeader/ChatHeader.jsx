/* eslint-disable react/prop-types */
import { useState } from 'react';
import { List, MagnifyingGlass } from "@phosphor-icons/react";

const ChatHeader = ({
  selectedContact,
  contactProfileImages,
  toggleSearchBar,
  searchVisible,
  searchTerm,
  handleSearchChange,
  handleSearchKeyPress,
  setIsChatFull,
}) => {
  const [searchActive, setSearchActive] = useState(false);

  const handleToggleSearch = () => {
    toggleSearchBar();
    setSearchActive(!searchActive);
  };

  if (!selectedContact || !contactProfileImages[selectedContact]) {
    return null; // Se não houver contato selecionado ou imagem de perfil correspondente, não renderizar o componente
  }

  return (
    <div className="p-2 bg-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button onClick={() => setIsChatFull(prev => !prev)}>
          <List size={28} className="text-black" />
        </button>
        <img
          src={contactProfileImages[selectedContact]}
          alt={`${selectedContact}'s Profile`}
          className="w-8 h-8 rounded-full"
        />
        <h2 className="text-sm font-bold text-black">{selectedContact}</h2>
      </div>

      <div className="relative flex items-center ml-auto">
        <button onClick={handleToggleSearch} className="mr-2">
          <MagnifyingGlass size={24} className="text-gray-500" />
        </button>
        {searchVisible && searchActive ? (
          <div className="absolute right-0 top-full mt-1">
            <input
              type="text"
              placeholder="Pesquisar no chat..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
              className="p-2 rounded bg-white shadow focus:outline-none text-sm font-semibold text-gray-900 placeholder-gray-500"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatHeader;
