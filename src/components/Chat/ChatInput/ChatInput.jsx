import { Paperclip, Smiley } from "@phosphor-icons/react";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import AudioRecorder from "../AudioRecorder/AudioRecorder";

const ChatInput = () => {
    return (
      <div className="chat-input p-4 flex items-center bg-white border-t border-gray-300">
      <button  className="emoji-button mr-2" ><Smiley size={32} /></button>
      <EmojiPicker/>
      <input
        type="file"
        id="file-input"
        className="hidden"
        
      />
      <button className="mr-2" onClick={() => document.getElementById('file-input').click()}>
        <Paperclip size={32} />
      </button>
      <input
        type="text"
        className="message-input flex-grow py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enviar mensagem para João...`}
      />
      <AudioRecorder />
    </div>
    )
  }
  
  export default ChatInput;
  