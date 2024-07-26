import { useContext } from 'react';
import { User, List } from "@phosphor-icons/react";
import ModalProfile from "../../components/Chat/Modals/ModalProfile";
import Chat from "../../components/Chat/Chat";
import Contacts from "../../components/Contacts/Contacts";
import InicialScreen from "../InicialSreen/InicialSreen";
import { ControlContext } from '../../context/ControlContext';


const ControlPage = () => {


  const { 
    toggleSidebar, 
    toggleModalProfile, 
    isModalProfileOpen, 
    isSidebarVisible,
    selectedContact,
  
  } = useContext(ControlContext);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between w-full px-4 py-3 md:px-20 md:py-6">
        <button className="my-3" onClick={toggleSidebar}>
          <List size={32} />
        </button>
        <button className="my-3" onClick={toggleModalProfile}>
          <User size={32} color='green'/>
        </button>
        {isModalProfileOpen && (
          <ModalProfile/>
        )}
      </div>

      <div className="flex flex-col md:flex-row flex-1 bg-white p-4 mx-auto w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        {isSidebarVisible && (
          <div className={`fixed inset-0 z-10 md:relative md:z-auto md:w-1/3 ${isSidebarVisible ? 'block' : 'hidden md:block'}`}>
            <Contacts/>
          </div>
        )}
        <div className={`flex-1 ${isSidebarVisible ? "hidden md:block" : "block"}`}>
          {selectedContact ? (
            <Chat/>
          ) : (
            <InicialScreen />
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPage;
