import { useState } from 'react';
import Layout from '../../components/Layout';

export default function EmailPush() {
  const [form, setForm] = useState({ title:'', body:'', type:'All Users', channel:'Push' });
  const [sent, setSent] = useState(false);
  const send = () => { setSent(true); setTimeout(()=>setSent(false),2500); setForm({ title:'', body:'', type:'All Users', channel:'Push' }); };
  return (
    <Layout title="Email / Push Notifications">
      <div className="page-header"><p className="breadcrumb">Home / Communication / <span>Email / Push Notifications</span></p><h1>Email / Push Notifications</h1></div>
      <div className="card" style={{maxWidth:'640px'}}>
        {sent && <div className="alert alert-success">Notification sent successfully to all users!</div>}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Channel</label>
            <select className="form-control" value={form.channel} onChange={e=>setForm({...form,channel:e.target.value})}>
              <option>Push</option><option>Email</option><option>Both</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Send To</label>
            <select className="form-control" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              <option>All Users</option><option>Active Users</option><option>Inactive Users</option><option>Specific User</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-control" placeholder="Notification title..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">Message Body</label>
          <textarea className="form-control" rows={4} placeholder="Write your message here..." value={form.body} onChange={e=>setForm({...form,body:e.target.value})} />
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={send} disabled={!form.title||!form.body}>Send Now</button>
          <button className="btn btn-outline">Save as Draft</button>
        </div>
      </div>
    </Layout>
  );
}
