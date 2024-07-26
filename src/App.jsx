import { ControlContextProvider } from './context/ControlContext';
import ControlPage from './pages/ControlPage/ControlPage';

const App = () => {
  return (
    <ControlContextProvider>
    <ControlPage />
    </ControlContextProvider>
  );
};

export default App;
