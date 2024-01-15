import { Link } from 'react-router-dom';

import '../renderer/App.css';
import logo from '../img/logo.png';
import right from '../img/right.png';

export default function Empty() {
  return (
    <div className="welcome-container">
      <img src={logo} alt="logo" width={300} />
      <div>
        <h1>Gateway</h1>
        <p>Welcome to Gateway, a simple, modern, tool to save time.</p>
      </div>
      <button type="button">
        <Link to="/">
          <img src={right} alt="right" width={100} className="right" />
        </Link>
      </button>
    </div>
  );
}
