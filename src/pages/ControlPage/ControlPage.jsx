import Chat from "../../components/Chat/Chat";
import Contacts from "../../components/Contatcs/Contatcs";
import { List, UserCircle } from "@phosphor-icons/react";

const ControlPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between w-full px-4 py-3 md:px-20 md:py-6">
        <button className="my-3">
          <List size={32} />
        </button>
        <button className="my-3">
          <UserCircle size={32} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 bg-white p-4 mx-auto w-full md:w-3/4 lg:w-2/3">
        <div className=" w-full md:w-1/4">
          <Contacts />
        </div>
        <div className="flex-1 mt-4 md:mt-0">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ControlPage;
