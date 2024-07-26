import { ChatContextProvider } from './context/ChatContext';
import ControlPage from './pages/ControlPage/ControlPage';

const App = () => {
  return (
    <ChatContextProvider>
    <ControlPage />
    </ChatContextProvider>
  );
};

export default App;
