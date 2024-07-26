import { ControlContextProvider } from './context/ControlContext';
import { ChatProvider } from './context/ChatContext';

import ControlPage from './pages/ControlPage/ControlPage';


const App = () => {
  return (
    <ControlContextProvider>
      <ChatProvider>

          <ControlPage />

      </ChatProvider>
    </ControlContextProvider>
  );
};

export default App;
