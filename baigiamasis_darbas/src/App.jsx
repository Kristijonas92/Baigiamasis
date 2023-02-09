import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import LogIn from './components/LogIn';

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={LogIn} />
      <Route path="/register" element={Registration} />
    </Routes>
  );
}

export default App;