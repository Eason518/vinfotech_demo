import { useState } from 'react';
import Layout from '../../components/Layout';

export default function ProjectNotification() {
  const [notifs, setNotifs] = useState([
    { id:1, event:'New User Registration', enabled:true },
    { id:2, event:'KYC Document Submitted', enabled:true },
    { id:3, event:'Withdrawal Request', enabled:true },
    { id:4, event:'Contest Created', enabled:false },
    { id:5, event:'Contest Winner Declared', enabled:true },
    { id:6, event:'Promo Code Used', enabled:false },
    { id:7, event:'Suspicious Activity Detected', enabled:true },
  ]);
  const toggle = (id) => setNotifs(n => n.map(x => x.id===id ? {...x,enabled:!x.enabled} : x));
  return (
    <Layout title="Project Notifications">
      <div className="page-header"><p className="breadcrumb">Home / Communication / <span>Project Notifications</span></p><h1>Project Notifications</h1></div>
      <div className="card" style={{maxWidth:'600px'}}>
        <p style={{color:'var(--text-muted)',fontSize:'13px',marginBottom:'20px'}}>Configure which platform events trigger admin notifications.</p>
        {notifs.map(n => (
          <div key={n.id} className="flex justify-between items-center" style={{padding:'14px 0',borderBottom:'1px solid var(--border)'}}>
            <span style={{fontWeight:500}}>{n.event}</span>
            <label className="toggle"><input type="checkbox" checked={n.enabled} onChange={()=>toggle(n.id)} /><span className="toggle-slider"></span></label>
          </div>
        ))}
        <button className="btn btn-primary mt-4">Save Settings</button>
      </div>
    </Layout>
  );
}
