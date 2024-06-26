import { useState } from 'react';
import { User, List } from "@phosphor-icons/react";
import ModalProfile from "../../components/Chat/Modals/ModalProfile";
import Chat from "../../components/Chat/Chat";
import Contacts from "../../components/Contacts/Contacts";
import InicialScreen from "../InicialSreen/InicialSreen";

const contactProfileImages = {
  Vitor: "/src/assets/vitor.png",
  Rickson: "/src/assets/sem-foto.png",
  Thiago: "/src/assets/thiago.png",    
  Bruno: "/src/assets/bruno.png",
  Rodrigo: "/src/assets/rodrigo.png",
  Abner: "/src/assets/sem-foto.png",
};

const ControlPage = () => {
  const initialContacts = ["Vitor", "Rickson", "Thiago", "Bruno", "Rodrigo", "Abner"];
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactsMessages, setContactsMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Novo estado

  const toggleModalProfile = () => {
    setIsModalProfileOpen(!isModalProfileOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setIsSidebarVisible(false);
    if (!contactsMessages[contact]) {
      setContactsMessages({
        ...contactsMessages,
        [contact]: [],
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSendMessage = (contact, message) => {
    const newMessage = {
      sender: "Me",
      content: message,
      file: null,
    };
    setContactsMessages({
      ...contactsMessages,
      [contact]: [...contactsMessages[contact], newMessage],
    });
  };

  const handleFileChange = (event, contact) => {
    const file = event.target.files[0];
    if (file && contact) {
      const newMessage = {
        sender: "Me",
        content: file.name,
        file: URL.createObjectURL(file),
      };
      setContactsMessages({
        ...contactsMessages,
        [contact]: [...contactsMessages[contact], newMessage],
      });
    }
  };

  const handleSendAudio = (audioBlob) => {
    const url = URL.createObjectURL(audioBlob);
    const newMessage = {
      sender: "Me",
      content: "Audio message",
      file: url,
    };
    setContactsMessages({
      ...contactsMessages,
      [selectedContact]: [...contactsMessages[selectedContact], newMessage],
    });
  };



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
          <ModalProfile
            isOpen={isModalProfileOpen}
            onClose={() => setIsModalProfileOpen(false)}
            onVerPerfil={() => console.log("Ver perfil")}
            onConfiguracoes={() => console.log("Configurações")}
            onSair={() => console.log("Sair")}
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row flex-1 bg-white p-4 mx-auto w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        {isSidebarVisible && (
          <div className={`fixed inset-0 z-10 md:relative md:z-auto md:w-1/3 ${isSidebarVisible ? 'block' : 'hidden md:block'}`}>
            <Contacts
              contacts={initialContacts}
              contactProfileImages={contactProfileImages}
              selectedContact={selectedContact}
              onContactClick={handleContactClick}
              searchTerm={searchTerm}
              onSearchChange={handleSearch}
            />
          </div>
        )}
        <div className={`flex-1 ${isSidebarVisible ? "md:w-2/3" : "w-full"}`}>
          {selectedContact ? (
            <Chat
              selectedContact={selectedContact}
              contactProfileImages={contactProfileImages}
              contactsMessages={contactsMessages}
              onSendMessage={handleSendMessage}
              onFileChange={handleFileChange}
              onSendAudio={handleSendAudio}
              toggleSidebar={toggleSidebar} // Passando a função de controle do sidebar
            />
          ) : (
            <InicialScreen />
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPage;
