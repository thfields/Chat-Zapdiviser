import { ChatContext } from './context/ChatContext';
import ControlPage from './pages/ControlPage/ControlPage';

const App = () => {
  return (
    <ChatContext.Provider>
    <ControlPage />
    </ChatContext.Provider>
  );
};

export default App;
