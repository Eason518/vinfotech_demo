import { useState } from 'react';
import Layout from '../../components/Layout';

const allPermissions = ['Dashboard','Market','Add Role','Manage Roles','Communication','Email / Push Notifications','Project Notifications','Promo Code','Manage User','CMS','Signup Page Image','User Report','User Deposit Amount','Withdrawal List','Transaction List','Winning Balance','Manage Avatars','Payment Management','Manage Games','Assets Upload','Change Password'];

export default function AddRole() {
  const [roleName, setRoleName] = useState('');
  const [perms, setPerms] = useState([]);
  const [saved, setSaved] = useState(false);
  const toggle = (p) => setPerms(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev, p]);
  const allSelected = perms.length === allPermissions.length;
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); setRoleName(''); setPerms([]); };

  return (
    <Layout title="Add Role">
      <div className="page-header">
        <p className="breadcrumb">Home / Admin Role Management / <span>Add Role</span></p>
        <h1>Add New Role</h1>
      </div>
      <div className="card">
        {saved && <div className="alert alert-success">Role created successfully!</div>}
        <div className="form-group" style={{maxWidth:'400px'}}>
          <label className="form-label">Role Name</label>
          <input className="form-control" placeholder="e.g. Content Manager" value={roleName} onChange={e=>setRoleName(e.target.value)} />
        </div>
        <div className="form-group">
          <div className="flex justify-between items-center mb-4">
            <label className="form-label" style={{marginBottom:0}}>Permissions</label>
            <label style={{cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',gap:'6px'}}>
              <input type="checkbox" checked={allSelected} onChange={()=>setPerms(allSelected?[]:[...allPermissions])} /> Select All
            </label>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
            {allPermissions.map(p => (
              <label key={p} style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',border:'1px solid',borderRadius:'8px',cursor:'pointer',background:perms.includes(p)?'#f0f6ff':'#fff',borderColor:perms.includes(p)?'var(--primary)':'var(--border)'}}>
                <input type="checkbox" checked={perms.includes(p)} onChange={()=>toggle(p)} /><span style={{fontSize:'13px'}}>{p}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="btn btn-primary" onClick={save} disabled={!roleName||perms.length===0}>Save Role</button>
          <button className="btn btn-outline">Cancel</button>
        </div>
      </div>
    </Layout>
  );
}
