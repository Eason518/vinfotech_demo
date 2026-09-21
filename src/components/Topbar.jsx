import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ pageTitle }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cj_auth');
    navigate('/login');
  };

  return (
    <header className="topbar">
      <div style={{fontWeight:600, fontSize:'15px'}}>{pageTitle}</div>
      <div className="topbar-right">
        <span className="topbar-time">{time.toLocaleString('en-IN')}</span>
        <div className="topbar-user">
          <div className="avatar-circle">VA</div>
          <span style={{fontSize:'13px', fontWeight:500}}>vadmin</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
