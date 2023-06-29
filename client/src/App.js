import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
