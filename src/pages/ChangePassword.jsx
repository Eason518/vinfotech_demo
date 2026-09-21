import { useState } from 'react';
import Layout from '../components/Layout';
export default function ChangePassword() {
  const [form, setForm] = useState({ current:'', newPass:'', confirm:'' });
  const [msg, setMsg] = useState('');
  const submit = (e) => { e.preventDefault(); if(form.newPass!==form.confirm){setMsg('error');return;} setMsg('success'); setForm({current:'',newPass:'',confirm:''}); setTimeout(()=>setMsg(''),2500); };
  return (
    <Layout title="Change Password">
      <div className="page-header"><p className="breadcrumb">Home / <span>Change Password</span></p><h1>Change Password</h1></div>
      <div className="card" style={{maxWidth:'440px'}}>
        {msg==='success' && <div className="alert alert-success">Password changed successfully!</div>}
        {msg==='error' && <div className="alert" style={{background:'#f8d7da',color:'#721c24',border:'1px solid #f5c6cb',padding:'12px 16px',borderRadius:'8px',marginBottom:'16px'}}>Passwords do not match.</div>}
        <form onSubmit={submit}>
          {[['current','Current Password'],['newPass','New Password'],['confirm','Confirm New Password']].map(([k,l])=>(
            <div className="form-group" key={k}>
              <label className="form-label">{l}</label>
              <input className="form-control" type="password" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} required />
            </div>
          ))}
          <button className="btn btn-primary" type="submit">Update Password</button>
        </form>
      </div>
    </Layout>
  );
}
