import { UserCircle } from "@phosphor-icons/react";

const Contacts = () => {
  const contacts = ['João', 'Maria', 'Pedro']; // Exemplo de contatos

  return (
    <div className="border rounded-lg border-blue-500 p-4 bg-gray-50 h-full">
      <h2 className="text-xl font-bold mb-4">Contatos</h2>
      <input type="search" className="bg-purple-white shadow rounded border-0 p-3" placeholder="Pesquise um contato">
      </input>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index} className="p-2 hover:bg-gray-300 rounded cursor-pointer flex gap-3">
            <UserCircle size={32} />  {contact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
