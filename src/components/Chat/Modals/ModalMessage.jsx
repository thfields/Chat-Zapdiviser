/* eslint-disable react/prop-types */
import { MessageContext } from '../../../context/MessageContext';
import { useContext } from 'react';

const ModalMessage = () => {

  const {
    closeModal,
    handleReply,
    handleForward,
    handleCopy,
    handleEdit,
    handleDelete,
    modalPosition,

  } = useContext(MessageContext);


  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center" onClick={closeModal}>
      <div
        className="bg-white p-4 rounded shadow-md"
        style={{ position: "absolute", top: modalPosition.top, left: modalPosition.left }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <ul>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleReply}>Reply</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleForward}>Forward</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleCopy}>Copy</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleEdit}>Edit</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={handleDelete}>Delete</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalMessage;
