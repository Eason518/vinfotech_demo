import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, User } from 'lucide-react';

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
      <div style={{fontWeight:600, fontSize:'15px', color:'var(--text)'}}>{pageTitle}</div>
      <div className="topbar-right">
        <span className="topbar-time">{time.toLocaleString('en-IN')}</span>
        <div style={{position:'relative', cursor:'pointer'}}>
          <Bell size={18} color="var(--text-muted)" />
          <span style={{position:'absolute',top:'-6px',right:'-6px',background:'var(--danger)',color:'#fff',borderRadius:'50%',width:'16px',height:'16px',fontSize:'9px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>3</span>
        </div>
        <div className="topbar-user">
          <div className="avatar-circle">VA</div>
          <div>
            <div style={{fontSize:'13px', fontWeight:600, lineHeight:1.2}}>vadmin</div>
            <div style={{fontSize:'11px', color:'var(--text-muted)', lineHeight:1.2}}>Super Admin</div>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout} style={{display:'flex',alignItems:'center',gap:'5px'}}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </header>
  );
}
