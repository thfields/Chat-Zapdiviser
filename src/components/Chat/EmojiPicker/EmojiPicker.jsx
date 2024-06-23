/* eslint-disable react/prop-types */
import Picker from 'emoji-picker-react';

const EmojiPicker = ({ visible, onClose, onEmojiClick }) => {
  if (!visible) return null;

  // Calcula a posição correta para centralizar horizontalmente o seletor de emoji
  const pickerStyle = {
      top: '25%',  // Posiciona 10px abaixo do botão
      left: '10%',               // Centraliza horizontalmente
      transform: 'translateX(-50%)',  // Centraliza horizontalmente
      maxWidth: '40px',         // Define uma largura máxima para o modal
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',  // Sombra
      borderRadius: '8px',       // Bordas arredondadas
  
  };

  return (
    <div className="emoji-picker absolute bg-white p-2 rounded-lg shadow-md" style={pickerStyle}>
      <Picker onEmojiClick={onEmojiClick} />
      <button className="bg-green-500 text-white px-3 py-1 mt-1 rounded-md shadow-md hover:bg-green-600 focus:outline-none text-sm" onClick={onClose}>Fechar</button>
    </div>
  );
};

export default EmojiPicker;
