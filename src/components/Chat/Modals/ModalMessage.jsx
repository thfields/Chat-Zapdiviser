/* eslint-disable react/prop-types */
const ModalMessage = ({ onClose, onReply, onForward, onEdit, onCopy, onDelete, position }) => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-white p-4 rounded shadow-md"
        style={{ position: "absolute", top: position.top, left: position.left }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <ul>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={onReply}>Reply</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={onForward}>Forward</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={onCopy}>Copy</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={onEdit}>Edit</li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={onDelete}>Delete</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalMessage;
