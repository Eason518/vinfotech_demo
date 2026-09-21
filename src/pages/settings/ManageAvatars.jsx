import { useState } from 'react';
import Layout from '../../components/Layout';
import { avatars as initialAvatars } from '../../data/mockData';

export default function ManageAvatars() {
  const [data, setData] = useState(initialAvatars);
  const [tab, setTab] = useState('Active');
  const [showModal, setShowModal] = useState(false);
  const [newEmoji, setNewEmoji] = useState('');
  const [newName, setNewName] = useState('');

  const filtered = data.filter(a => a.status === tab);
  const toggleStatus = (id) => setData(d => d.map(a => a.id===id ? {...a, status: a.status==='Active'?'Hidden':'Active'} : a));
  const addAvatar = () => {
    if (!newEmoji || !newName) return;
    setData(d => [...d, { id: Date.now(), emoji: newEmoji, name: newName, status: 'Active' }]);
    setNewEmoji(''); setNewName(''); setShowModal(false);
  };

  return (
    <Layout title="Manage Avatars">
      <div className="page-header">
        <p className="breadcrumb">Home / Settings / <span>Manage Avatars</span></p>
        <div className="flex justify-between items-center">
          <h1>Manage Avatars</h1>
          <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Avatar</button>
        </div>
      </div>
      <div className="card">
        <div className="tabs">
          {['Active','Hidden'].map(t => <div key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t} ({data.filter(a=>a.status===t).length})</div>)}
        </div>
        <div className="avatar-grid">
          {filtered.map(a => (
            <div key={a.id} className="avatar-item" onClick={()=>toggleStatus(a.id)}>
              <div className="av-img">{a.emoji}</div>
              <span>{a.name}</span>
              <span style={{fontSize:'11px', marginTop:'4px', color: a.status==='Active'?'var(--success)':'var(--text-muted)'}}>
                {a.status === 'Active' ? 'Hide' : 'Show'}
              </span>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p style={{textAlign:'center',padding:'40px',color:'var(--text-muted)'}}>No {tab.toLowerCase()} avatars.</p>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" style={{width:'360px'}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Avatar</h3>
              <button className="modal-close" onClick={()=>setShowModal(false)}>x</button>
            </div>
            <div className="form-group">
              <label className="form-label">Emoji / Icon</label>
              <input className="form-control" value={newEmoji} onChange={e=>setNewEmoji(e.target.value)} placeholder="e.g. 🦊" style={{fontSize:'24px'}} />
            </div>
            <div className="form-group">
              <label className="form-label">Avatar Name</label>
              <input className="form-control" value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Fox" />
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addAvatar}>Add Avatar</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
