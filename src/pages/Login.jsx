import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 700));
    if (form.email === 'vadmin@vinfotech.com' && form.password === 'Vdemo@12345') {
      localStorage.setItem('cj_auth', '1');
      navigate('/landing');
    } else {
      setError('Invalid email or password. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight:'100vh', background:'#eeeff4',
      display:'flex', flexDirection:'column',
    }}>
      {/* Top bar */}
      <div style={{background:'#1e2a3a', padding:'16px 24px'}}>
        <div style={{color:'#fff', fontWeight:700, fontSize:'18px'}}>Cricjam Admin panel</div>
        <div style={{color:'rgba(255,255,255,0.6)', fontSize:'13px', marginTop:'2px'}}>Let in to get going</div>
      </div>

      {/* Center form */}
      <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{
          background:'#fff', borderRadius:'8px', padding:'32px 40px',
          width:'400px', boxShadow:'0 2px 12px rgba(0,0,0,0.1)'
        }}>
          {/* Logo */}
          <div style={{textAlign:'center', marginBottom:'24px'}}>
            <div style={{fontSize:'48px'}}>🛡️</div>
            <div style={{fontWeight:800, fontSize:'20px', letterSpacing:'2px', color:'#1e2a3a'}}>CRICJAM</div>
          </div>

          {error && (
            <div style={{background:'#fdecea', color:'#c0392b', border:'1px solid #f5c6cb', borderRadius:'6px', padding:'10px 14px', fontSize:'13px', marginBottom:'16px'}}>
              {error}
            </div>
          )}

          <form onSubmit={handle}>
            <div style={{marginBottom:'16px'}}>
              <input
                className="form-control"
                type="email" placeholder="Email"
                style={{background:'#eef0f2', border:'none', borderRadius:'6px', padding:'12px 14px', fontSize:'14px'}}
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
            </div>
            <div style={{marginBottom:'24px'}}>
              <input
                className="form-control"
                type="password" placeholder="Password"
                style={{background:'#eef0f2', border:'none', borderRadius:'6px', padding:'12px 14px', fontSize:'14px'}}
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width:'100%', padding:'12px', background:'#6c757d',
                color:'#fff', border:'none', borderRadius:'6px',
                fontWeight:600, fontSize:'14px', cursor:'pointer',
                marginBottom:'16px'
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{textAlign:'center'}}>
            <a
              href="#/forgot-password"
              style={{color:'#e74c3c', fontSize:'13px', textDecoration:'none', fontWeight:500}}
              onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}
            >
              Forgot Password?
            </a>
          </div>

          <p style={{textAlign:'center', marginTop:'20px', fontSize:'11px', color:'#999'}}>
            Demo: vadmin@vinfotech.com / Vdemo@12345
          </p>
        </div>
      </div>
    </div>
  );
}
