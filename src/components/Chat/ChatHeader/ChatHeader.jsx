/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { List, MagnifyingGlass, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import ModalHeader from '../Modals/ModalHeader'; // Importe o componente ModalHeader

const ChatHeader = ({
  selectedContact,
  contactProfileImages,
  toggleSearchBar,
  searchVisible,
  searchTerm,
  setSearchTerm,
  handleSearchChange,
  handleSearchKeyPress,
}) => {
  const [searchActive, setSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [searching, setSearching] = useState(false); // Estado para controlar se estamos realizando uma pesquisa

  const handleToggleSearch = () => {
    toggleSearchBar();
    setSearchActive(!searchActive);
    setSearchTerm(""); // Limpa o termo de pesquisa ao alternar a barra de pesquisa
    setSearching(false); // Ao alternar, garantimos que não estamos mais em modo de pesquisa
  };

  const handleDotsClick = (event) => {
    // Se o modal já estiver aberto, simplesmente o fecha e interrompe a execução da função
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }
  
    const icon = event.currentTarget;
    const iconRect = icon.getBoundingClientRect();
    const modalWidth = 180; // Largura do modal
  
    // Calcula a posição do modal para que fique ao lado direito e abaixo do ícone
    const modalTop = iconRect.bottom + window.scrollY + 10;
    const modalLeft = iconRect.left + window.scrollX - modalWidth + iconRect.width;
  
    setModalPosition({ top: modalTop, left: modalLeft });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setSearching(true); // Ativa o modo de pesquisa quando o usuário pressiona Enter
    }
  };

  if (!selectedContact || !contactProfileImages[selectedContact]) {
    return null; // Não renderiza o componente se não houver contato selecionado ou imagem de perfil correspondente
  }

  return (
    <div className="p-2 bg-gray-100 flex items-center justify-between relative">
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

      <div className="relative">
        <button onClick={handleToggleSearch} className="mr-8">
          <MagnifyingGlass size={24} className="text-gray-500" />
        </button>
        {searchVisible && searchActive ? (
          <div className="absolute right-0 top-full mt-1">
            <input
              type="text"
              placeholder="Pesquisar no chat..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                handleSearchKeyPress(e);
                handleSearch(e); // Chama handleSearch no evento de pressionar Enter
              }}
              className="p-2 rounded bg-white shadow focus:outline-none text-sm font-semibold text-gray-900 placeholder-gray-500"
            />
          </div>
        ) : null}
        <div className="absolute right-0 top-0">
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
      {searching && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 z-10"></div>
      )}
    </div>
  );
};

export default ChatHeader;
