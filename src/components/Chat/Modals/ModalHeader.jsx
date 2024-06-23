/* eslint-disable react/prop-types */
import { Folders, Trash, SpeakerSimpleSlash } from "@phosphor-icons/react";

const ModalHeader = ({ isOpen, onClose, onArchive, onDelete, onMute }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute bg-white p-4 rounded shadow-md z-50"
      style={{
        top: '180%', // Aumenta a distância do topo
        right: '100%', // Posiciona 5% à direita
        maxWidth: '240px', // Define uma largura máxima para o modal
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', // Sombra
        borderRadius: '8px', // Bordas arredondadas
      }}
    >
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => {
              onArchive();
              onClose();
            }}
            className="block w-full text-left py-2 px-4 hover:bg-gray-100 flex items-center"
          >
            <Folders size={17} className="mr-2"/> Arquivar
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="block w-full text-left py-2 px-4 hover:bg-gray-100 flex items-center"
          >
            <Trash size={17} className="mr-2"/> Deletar
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onMute();
              onClose();
            }}
            className="block w-full text-left py-2 px-4 hover:bg-gray-100 flex items-center"
          >
            <SpeakerSimpleSlash size={17} className="mr-2"/> Silenciar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ModalHeader;
