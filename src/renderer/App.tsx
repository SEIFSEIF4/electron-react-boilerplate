// @ts-ignore
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainCom from '../components/MainCom';
import CornerLogo from '../components/CornerLogo';
import Empty from '../components/Empty';

function Main() {
  return (
    <div className="App">
      <CornerLogo />
      <MainCom />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/empty" element={<Empty />} />
      </Routes>
    </Router>
  );
}
