/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useMessages } from "../../../hooks/useMessages";
import { ChatContext } from "../../../context/ChatContext";

const ModalMessage = () => {

  const { closeModal,  modalPosition, currentMessage, setEditingMessageId, setMessageInput } = useContext(ChatContext);

  const {
    // handleReply,
    // handleForward,
    handleCopy,
    handleDelete,
  } = useMessages();

  const handleEdit = () => {
    if (currentMessage) {
      setEditingMessageId(currentMessage.id);
      setMessageInput(currentMessage.content); // Atualiza o estado do ChatInput
      closeModal(); // Fecha o modal
    }
  };


  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center" onClick={closeModal}>
      <div
        className="bg-white p-4 rounded shadow-md"
        style={{ position: "absolute", top: modalPosition.top, left: modalPosition.left }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <ul>
          {/* <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleReply}>Reply</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleForward}>Forward</li> */}
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleCopy}>Copy</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleEdit}>Edit</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleDelete}>Delete</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalMessage;
