import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    if (form.email === 'vadmin@vinfotech.com' && form.password === 'Vdemo@12345') {
      localStorage.setItem('cj_auth', '1');
      navigate('/landing');
    } else {
      setError('Invalid email or password.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div style={{fontSize:'80px', marginBottom:'16px'}}>🏏</div>
          <h1>CRICJAM</h1>
          <p>The ultimate Fantasy Sports platform.<br/>Manage your contests, users, and finances all in one place.</p>
        </div>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handle}>
          <div className="login-logo">
            <div style={{fontSize:'40px'}}>🏏</div>
            <h2>Admin Portal</h2>
            <p>Sign in to your admin account</p>
          </div>
          {error && <div className="alert alert-info">{error}</div>}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-control" type="email" placeholder="Enter your email"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" placeholder="Enter your password"
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          </div>
          <button className="btn btn-primary" style={{width:'100%', justifyContent:'center', padding:'11px', marginTop:'8px'}} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <p style={{textAlign:'center', marginTop:'16px', fontSize:'12px', color:'var(--text-muted)'}}>
            Demo: vadmin@vinfotech.com / Vdemo@12345
          </p>
        </form>
      </div>
    </div>
  );
}
