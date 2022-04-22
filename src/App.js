import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Professionals from './Components/Professionals';
import Profile from './Components/Profile';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Professionals />} />
    <Route path="/Profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
