/* eslint-disable react/prop-types */
import { User, Gear, SignOut } from "@phosphor-icons/react";
import { ChatContext } from '../../../context/ChatContext';
import { useContext } from 'react';



const ModalProfile = () => {

  const { 
    isModalProfileOpen,
    setIsModalProfileOpen,

  
  } = useContext(ChatContext);


  if (!isModalProfileOpen) return null;

  return (
    <div className="absolute bg-white p-4 rounded shadow-md z-50"
    style={{
        top: '5%',  // Posiciona 10px abaixo do botão
        left: '87%',               // Centraliza horizontalmente
        transform: 'translateX(-50%)',  // Centraliza horizontalmente
        maxWidth: '240px',         // Define uma largura máxima para o modal
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',  // Sombra
        borderRadius: '8px',       // Bordas arredondadas
      }}
    
    >
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => {
              setIsModalProfileOpen();
            }}
            className="block w-full text-left py-2 px-4 hover:bg-gray-100"
          >
            <User size={32} color='green'/> Ver perfil
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setIsModalProfileOpen();
            }}
            className="block w-full text-left py-2 px-4 hover:bg-gray-100"
          >
           <Gear size={32} /> Configurações
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setIsModalProfileOpen();
            }}
            className="block w-full text-left py-2 px-4 hover:bg-gray-100"
          >
            <SignOut size={32} /> Sair
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ModalProfile;
