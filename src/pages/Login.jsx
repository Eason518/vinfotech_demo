import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 700));
    if (form.email === 'vadmin@vinfotech.com' && form.password === 'Vdemo@12345') {
      localStorage.setItem('cj_auth', '1');
      navigate('/landing');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div style={{fontSize:'72px', marginBottom:'16px', filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'}}>🏏</div>
          <h1>CRICJAM</h1>
          <p>The ultimate Fantasy Sports admin platform.<br/>Manage contests, users, and finances all in one place.</p>
          <div style={{marginTop:'40px', display:'flex', gap:'32px', justifyContent:'center'}}>
            {[['48K+','Registered Users'],['1.8K+','Active Contests'],['Rs.28L+','Total Deposits']].map(([n,l])=>(
              <div key={l} style={{textAlign:'center'}}>
                <div style={{color:'#fff',fontSize:'24px',fontWeight:800}}>{n}</div>
                <div style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',marginTop:'2px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handle}>
          <div className="login-logo">
            <div style={{width:'56px',height:'56px',borderRadius:'14px',background:'linear-gradient(135deg,#3a7bd5,#6f42c1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:'28px'}}>🏏</div>
            <h2>Admin Portal</h2>
            <p>Sign in to your admin account</p>
          </div>

          {error && (
            <div className="alert" style={{background:'#fff3cd',color:'#856404',border:'1px solid #ffc107',borderRadius:'8px',padding:'12px 14px',display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',marginBottom:'16px'}}>
              <AlertCircle size={16} />{error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{position:'relative'}}>
              <Mail size={15} style={{position:'absolute',left:'11px',top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}} />
              <input className="form-control" type="email" placeholder="Enter your email" style={{paddingLeft:'34px'}}
                value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{position:'relative'}}>
              <Lock size={15} style={{position:'absolute',left:'11px',top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}} />
              <input className="form-control" type={showPass?'text':'password'} placeholder="Enter your password" style={{paddingLeft:'34px',paddingRight:'36px'}}
                value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
              <button type="button" onClick={()=>setShowPass(s=>!s)} style={{position:'absolute',right:'10px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)',fontSize:'12px'}}>
                {showPass?'Hide':'Show'}
              </button>
            </div>
          </div>

          <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'11px',marginTop:'8px',fontSize:'14px'}} type="submit" disabled={loading}>
            {loading ? <span style={{display:'flex',alignItems:'center',gap:'8px'}}><span style={{width:'14px',height:'14px',border:'2px solid rgba(255,255,255,0.4)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}></span>Signing in...</span>
             : <span style={{display:'flex',alignItems:'center',gap:'8px'}}><LogIn size={16} /> Sign In</span>}
          </button>

          <div style={{marginTop:'20px',padding:'14px',background:'#f8f9fa',borderRadius:'8px',fontSize:'12px'}}>
            <div style={{fontWeight:600,marginBottom:'4px',color:'var(--text-muted)'}}>Demo Credentials</div>
            <div style={{color:'var(--text-muted)'}}>Email: vadmin@vinfotech.com</div>
            <div style={{color:'var(--text-muted)'}}>Password: Vdemo@12345</div>
          </div>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
    </div>
  );
}
