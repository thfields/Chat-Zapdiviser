/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { List, MagnifyingGlass, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import ModalHeader from '../Modals/ModalHeader'; // Importe o componente ModalHeader
import { ControlContext } from '../../../context/ControlContext';
import { ChatContext } from '../../../context/ChatContext';

const ChatHeader = () => {

  const {
    toggleSearchBar,
    searchVisible,
    searchMessage,
    setSearchMessage,
    handleSearchChange,
    handleSearchKeyPress,

  } = useContext(ChatContext);
  
  
  const { 
    profileImages, 
    selectedContact,
    toggleSidebar,

    modalPosition,
    setModalPosition 
  
  } = useContext(ControlContext);

  const [searchActive, setSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleSearch = () => {
    toggleSearchBar();
    setSearchActive(!searchActive);
    setSearchMessage(""); // Limpa o termo de pesquisa ao alternar a barra de pesquisa
  };

  const handleDotsClick = (event) => {
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }

    const icon = event.currentTarget;
    const iconRect = icon.getBoundingClientRect();
    const modalWidth = 180;

    const modalTop = iconRect.bottom + window.scrollY + 10;
    const modalLeft = iconRect.left + window.scrollX - modalWidth + iconRect.width;

    setModalPosition({ top: modalTop, left: modalLeft });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!selectedContact || !profileImages[selectedContact]) {
    return null; 
  }

  return (
    <div className="p-2 bg-white flex items-center justify-between relative">
      <div className="flex items-center gap-2">
        <button onClick={toggleSidebar}>
          <List size={28} className="text-black" />
        </button>
        <img
          src={profileImages[selectedContact]}
          alt={`${selectedContact}'s Profile`}
          className="w-8 h-8 rounded-full"
        />
        <h2 className="text-sm font-bold text-black">{selectedContact}</h2>
      </div>

      <div className="relative flex items-center">
        {searchVisible && searchActive ? (
          <input
            type="text"
            placeholder="Pesquisar no chat..."
            value={searchMessage}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            className="p-2 rounded bg-white shadow focus:outline-none text-sm font-semibold text-gray-900 placeholder-gray-500 mr-2"
          />
        ) : null}
        <button onClick={handleToggleSearch} className="mr-2">
          <MagnifyingGlass size={24} className="text-gray-500" />
        </button>
        <div className="relative">
          <DotsThreeOutlineVertical
            size={22}
            className="cursor-pointer text-gray-500"
            onClick={handleDotsClick}
          />
          <ModalHeader
            isOpen={isModalOpen}
            onClose={closeModal}
            onArchive={() => console.log("Arquivar conversa")}
            onDelete={() => console.log("Deletar conversa")}
            onMute={() => console.log("Silenciar conversa")}
            style={{ top: modalPosition.top, left: modalPosition.left }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
