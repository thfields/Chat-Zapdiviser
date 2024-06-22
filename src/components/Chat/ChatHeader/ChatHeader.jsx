import { List, UserCircle, MagnifyingGlass, DotsThreeOutlineVertical } from "@phosphor-icons/react";


const ChatHeader = () => {
  return (
    <div className="p-4 bg-gray-100 flex items-center justify-between">
      <List size={32} />  <UserCircle size={32} />
      <h2 className="text-xl font-bold">João</h2>
      <span className="text-lg font-semibold"><MagnifyingGlass size={32} /></span>
      <DotsThreeOutlineVertical size={32} />
    </div>
  )
}

export default ChatHeader;
