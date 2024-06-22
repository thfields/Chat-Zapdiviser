import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMenssage from "./ChatMenssage/ChatMenssage";
import ChatInput from "./ChatInput/ChatInput";

const Chat = () => {
  return (
    <div className="flex flex-col h-full border rounded-lg border-blue-500">
      <ChatHeader />
      <ChatMenssage />
      <ChatInput />
    </div>
  );
};

export default Chat;
