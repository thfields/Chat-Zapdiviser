import { ControlContextProvider } from './context/ControlContext';
import { ChatProvider } from './context/ChatContext';
import { MessageProvider } from './context/MessageContext';
import ControlPage from './pages/ControlPage/ControlPage';


const App = () => {
  return (
    <ControlContextProvider>
      <ChatProvider>
        <MessageProvider>
          <ControlPage />
        </MessageProvider>
      </ChatProvider>
    </ControlContextProvider>
  );
};

export default App;
