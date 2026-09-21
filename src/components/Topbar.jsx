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

  const formatTime = (d) => {
    let h = d.getHours();
    const m = d.getMinutes().toString().padStart(2,'0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm} IST`;
  };

  return (
    <header className="topbar">
      <div style={{fontWeight:600, fontSize:'15px', color:'var(--text)'}}>{pageTitle}</div>
      <div className="topbar-right">
        <span style={{
          background:'var(--bg)', border:'1px solid var(--border)',
          borderRadius:'6px', padding:'6px 14px',
          fontSize:'13px', color:'var(--text-muted)', fontWeight:500
        }}>{formatTime(time)}</span>
        <button
          className="btn-logout"
          onClick={handleLogout}
          style={{
            background:'none', border:'1px solid var(--border)',
            color:'var(--text)', padding:'6px 20px',
            borderRadius:'6px', cursor:'pointer', fontSize:'13px', fontWeight:500
          }}
        >
          Log Out
        </button>
      </div>
    </header>
  );
}
