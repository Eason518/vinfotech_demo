import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ minHeight:'100vh', background:'#eeeff4', display:'flex', flexDirection:'column' }}>
      <div style={{background:'#1e2a3a', padding:'16px 24px'}}>
        <div style={{color:'#fff', fontWeight:700, fontSize:'18px'}}>Cricjam Admin panel</div>
        <div style={{color:'rgba(255,255,255,0.6)', fontSize:'13px', marginTop:'2px'}}>Reset your password</div>
      </div>
      <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{background:'#fff', borderRadius:'8px', padding:'32px 40px', width:'400px', boxShadow:'0 2px 12px rgba(0,0,0,0.1)'}}>
          <div style={{textAlign:'center', marginBottom:'24px'}}>
            <div style={{fontSize:'48px'}}>🛡️</div>
            <div style={{fontWeight:800, fontSize:'20px', letterSpacing:'2px', color:'#1e2a3a'}}>CRICJAM</div>
          </div>
          <h3 style={{marginBottom:'8px', fontWeight:600}}>Forgot Password</h3>
          <p style={{color:'#666', fontSize:'13px', marginBottom:'20px'}}>Enter your email address and we'll send you a reset link.</p>
          {sent ? (
            <div style={{background:'#d4edda', color:'#155724', border:'1px solid #c3e6cb', borderRadius:'6px', padding:'12px', fontSize:'13px', marginBottom:'16px'}}>
              Reset link sent! Please check your email.
            </div>
          ) : (
            <form onSubmit={handle}>
              <div style={{marginBottom:'16px'}}>
                <input className="form-control" type="email" placeholder="Email Address"
                  style={{background:'#eef0f2', border:'none', borderRadius:'6px', padding:'12px 14px', fontSize:'14px'}}
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button type="submit" style={{width:'100%', padding:'12px', background:'#e74c3c', color:'#fff', border:'none', borderRadius:'6px', fontWeight:600, fontSize:'14px', cursor:'pointer', marginBottom:'12px'}}>
                Send Reset Link
              </button>
            </form>
          )}
          <div style={{textAlign:'center'}}>
            <a href="#" style={{color:'#3a7bd5', fontSize:'13px'}} onClick={(e)=>{e.preventDefault(); navigate('/login');}}>
              ← Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
