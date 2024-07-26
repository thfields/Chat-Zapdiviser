/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from 'react';
import { Paperclip, Smiley } from "@phosphor-icons/react";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import AudioRecorder from "../AudioRecorder/AudioRecorder";
import { ControlContext } from '../../../context/ControlContext';
import { useMessages } from '../../../hooks/useMessages';

const ChatInput = () => {
  
  const {
    selectedContact,
  } = useContext(ControlContext);


  const {
    handleSendMessage,
    handleFileChange,
  } = useMessages();

  

  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, left: 0 });
  const emojiButtonRef = useRef(null);

  const handleSendMessages = () => {
    if (messageInput.trim() === '' || !selectedContact) {
      return;
    }

    handleSendMessage(selectedContact, messageInput.trim());
    setMessageInput('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessages();
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);

    if (emojiButtonRef.current) {
      const buttonRect = emojiButtonRef.current.getBoundingClientRect();
      const chatAreaRect = document.querySelector('.chat-area').getBoundingClientRect();

      const top = buttonRect.top - chatAreaRect.top - buttonRect.height;
      const left = buttonRect.left - chatAreaRect.left;

      setEmojiPickerPosition({ top, left });
    }
  };

  const onEmojiClick = (emojiObject) => {
    console.log(emojiObject);
    setMessageInput(prevInput => prevInput + emojiObject.emoji);
  };

  return (
    <div className="chat-input p-2 flex items-center bg-white border-t border-gray-300">
      <button className="emoji-button mr-1 hover:text-green-500" onClick={toggleEmojiPicker}><Smiley size={24} /></button>
      <button className="mr-1 hover:text-green-500" onClick={() => document.getElementById('file-input').click()}><Paperclip size={24} /></button>
      <input
        type="file"
        id="file-input"
        className="hidden"
        onChange={(e) => handleFileChange(e, selectedContact)}
      />
      <input
        type="text"
        className="message-input flex-grow py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={`Enviar mensagem para ${selectedContact}`}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <AudioRecorder/>
      <EmojiPicker 
        visible={showEmojiPicker} 
        position={emojiPickerPosition} 
        onClose={() => setShowEmojiPicker(false)} 
        onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default ChatInput;
