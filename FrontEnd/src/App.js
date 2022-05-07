import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import ChooseCity from './components/ChooseCity'

export default function App() {
  return (
    <div className='App-header'>
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ChooseCity" element={<ChooseCity />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
    </div>
  );
}