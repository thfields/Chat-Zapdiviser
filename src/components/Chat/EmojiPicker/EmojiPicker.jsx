/* eslint-disable react/prop-types */
import Picker from 'emoji-picker-react';

const EmojiPicker = ({ visible, position, onClose, onEmojiClick }) => {
  if (!visible) return null;

  return (
    <div className="emoji-picker absolute z-50" style={{ top: position.top, left: position.left }}>
      <Picker onEmojiClick={onEmojiClick} />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none" onClick={onClose}>Fechar</button>
    </div>
  );
};

export default EmojiPicker;
