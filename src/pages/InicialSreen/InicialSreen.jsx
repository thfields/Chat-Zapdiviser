

const InicialSreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full border border-gray-300 rounded-lg shadow-md">
        <img
        src="/src/assets/whatsapp.png"
        alt="Logo"
        className="mb-4 w-100 h-60"
        />
        <p className="text-xl text-gray-700">Selecione um contato para iniciar uma conversa.</p>
    </div>
  )
};

export default InicialSreen;
