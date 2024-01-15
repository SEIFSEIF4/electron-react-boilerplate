import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export default function CornerLogo() {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="CornerLogo">
      <Link to="/empty">
        <img src={logo} alt="logo" width={80} />
      </Link>
      <span>Gateway</span>
      <button type="button" onClick={handleReload}>
        Reload
      </button>
    </div>
  );
}
