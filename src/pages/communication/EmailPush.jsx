import { useState } from 'react';
import { Upload } from 'lucide-react';
import Layout from '../../components/Layout';
import { toast } from '../../components/Toast';

export default function EmailPush() {
  const [notifType, setNotifType] = useState('Push');
  const [userbase, setUserbase] = useState('All User');
  const [deviceType, setDeviceType] = useState('All');
  const [duration, setDuration] = useState('Today');
  const [totalUsers] = useState(0);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

  const handleSend = () => {
    if (!subject || !body) return;
    toast('Notification sent successfully', 'success');
    setSubject('');
    setBody('');
    setImage(null);
  };

  return (
    <Layout title="Email / Notification Management">
      <div className="page-header">
        <p className="breadcrumb">Home / Communication / Email / <span>Push Notifications</span></p>
        <h1>Email / Notification Management</h1>
      </div>

      {/* Top filter bar */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '13px' }}>Send Email / Notification to all user</span>
          <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            {['Push Notification', 'Email'].map(t => (
              <button
                key={t}
                onClick={() => setNotifType(t === 'Push Notification' ? 'Push' : 'Email')}
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  background: (t === 'Push Notification' && notifType === 'Push') || (t === 'Email' && notifType === 'Email') ? 'var(--primary)' : '#fff',
                  color: (t === 'Push Notification' && notifType === 'Push') || (t === 'Email' && notifType === 'Email') ? '#fff' : 'var(--text)',
                }}
              >{t}</button>
            ))}
          </div>
          <select className="form-control" style={{ width: 'auto' }} value={userbase} onChange={e => setUserbase(e.target.value)}>
            <option>All User</option>
            <option>Active Users</option>
            <option>Inactive Users</option>
          </select>
          <select className="form-control" style={{ width: 'auto' }} value={deviceType} onChange={e => setDeviceType(e.target.value)}>
            <option>All</option>
            <option>Android</option>
            <option>iOS</option>
          </select>
          <select className="form-control" style={{ width: 'auto' }} value={duration} onChange={e => setDuration(e.target.value)}>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <button className="btn btn-danger btn-sm">Get Users</button>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Total Users: {totalUsers}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left panel 60% */}
        <div style={{ flex: '0 0 60%' }}>
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '16px' }}>
              {notifType === 'Push' ? 'Push Notification' : 'Email'}
            </div>
            <div className="form-group">
              <label className="form-label">Subject <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input className="form-control" placeholder="Text.." value={subject} onChange={e => setSubject(e.target.value)} />
            </div>
            <div className="form-group">
              <div
                style={{ border: '2px dashed var(--border)', borderRadius: '8px', padding: '30px', textAlign: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}
                onClick={() => document.getElementById('imgUpload').click()}
              >
                <Upload size={28} style={{ marginBottom: '8px', opacity: 0.5 }} />
                <div style={{ fontSize: '13px' }}>Upload Image (Size 800*300)</div>
                {image && <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '6px' }}>{image}</div>}
              </div>
              <input id="imgUpload" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setImage(e.target.files[0]?.name || null)} />
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Body <span style={{ color: 'var(--danger)' }}>*</span></label>
                <span style={{ fontSize: '12px', color: 'var(--danger)', cursor: 'pointer', fontWeight: 500 }}>Emoji Keyboard</span>
              </div>
              <textarea className="form-control" rows={5} placeholder="Write message body..." value={body} onChange={e => setBody(e.target.value)} />
            </div>
            <button
              className="btn btn-danger"
              style={{ width: '100%' }}
              onClick={handleSend}
              disabled={!subject || !body}
            >
              Send
            </button>
          </div>
        </div>

        {/* Right panel 40% */}
        <div style={{ flex: '0 0 40%' }}>
          <div className="card" style={{ height: '100%' }}>
            <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Saved Templates <span style={{ fontSize: '14px', color: 'var(--text-muted)', cursor: 'help' }}>ⓘ</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '60px', marginBottom: '16px', lineHeight: 1 }}>🤷</div>
              <div style={{ fontSize: '14px', textAlign: 'center' }}>No template found. Create your first template</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
