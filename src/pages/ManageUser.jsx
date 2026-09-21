import { useState } from 'react';
import { Search, Filter, Flag, Eye, Ban, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { users } from '../data/mockData';

const statusBadge = (s) => {
  if (s === 'Active') return 'badge-success';
  if (s === 'Flagged') return 'badge-danger';
  if (s === 'Pending Docs') return 'badge-warning';
  return 'badge-secondary';
};
const kycBadge = (s) => s==='Verified'?'badge-success':s==='Pending'?'badge-warning':'badge-danger';

export default function ManageUser() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [data, setData] = useState(users);
  const [selected, setSelected] = useState(null);

  const tabs = ['All', 'Active', 'Pending Docs', 'Flagged'];
  const filtered = data.filter(u => {
    const matchTab = filter === 'All' || u.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const toggleFlag = (id) => setData(d => d.map(u => u.id===id ? {...u, flag:!u.flag, status: !u.flag?'Flagged':(u.kycStatus==='Verified'?'Active':'Pending Docs')} : u));
  const toggleBlock = (id) => setData(d => d.map(u => u.id===id ? {...u, status: u.status==='Active'?'Blocked':'Active'} : u));

  const counts = { All: data.length, Active: data.filter(u=>u.status==='Active').length, 'Pending Docs': data.filter(u=>u.status==='Pending Docs').length, Flagged: data.filter(u=>u.flag).length };

  return (
    <Layout title="Manage User">
      <div className="page-header">
        <p className="breadcrumb">Home / User Management / <span>Manage User</span></p>
        <h1>Manage Users</h1>
      </div>

      <div className="card">
        <div className="flex justify-between items-center" style={{marginBottom:'16px'}}>
          <div className="tabs" style={{marginBottom:0, borderBottom:'none', flexWrap:'nowrap'}}>
            {tabs.map(t => (
              <div key={t} className={`tab ${filter===t?'active':''}`} style={{paddingTop:0}} onClick={()=>setFilter(t)}>
                {t} <span style={{background:'var(--bg)',borderRadius:'10px',padding:'1px 7px',fontSize:'11px',marginLeft:'4px'}}>{counts[t]}</span>
              </div>
            ))}
          </div>
          <div style={{position:'relative'}}>
            <Search size={14} style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}} />
            <input className="form-control" style={{width:'260px',paddingLeft:'32px'}} placeholder="Search username, email, ID..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Doc Type</th><th>Unique ID</th><th>Username</th><th>City</th>
              <th>Phone</th><th>Email</th><th>KYC</th><th>Status</th><th>Wallet</th><th>Action</th>
            </tr></thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td style={{fontSize:'12px'}}><span className="badge badge-secondary">{u.doc}</span></td>
                  <td style={{fontFamily:'monospace',fontSize:'12px',color:'var(--primary)'}}>{u.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#3a7bd5,#6f42c1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'11px',flexShrink:0}}>
                        {u.username[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{fontWeight:600,fontSize:'13px'}}>{u.username}</div>
                        <div style={{fontSize:'11px',color:'var(--text-muted)'}}>{u.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{u.city}</td>
                  <td>{u.phone}</td>
                  <td style={{fontSize:'12px'}}>{u.email}</td>
                  <td><span className={`badge ${kycBadge(u.kycStatus)}`}>{u.kycStatus}</span></td>
                  <td><span className={`badge ${statusBadge(u.status)}`}>{u.status}</span></td>
                  <td style={{fontWeight:600}}>Rs.{u.wallet.toFixed(2)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline" title="View Details" onClick={()=>setSelected(u)}><Eye size={12} /></button>
                      <button className={`btn btn-xs ${u.flag?'btn-danger':'btn-outline'}`} title="Flag User" onClick={()=>toggleFlag(u.id)}><Flag size={12} /></button>
                      <button className={`btn btn-xs ${u.status==='Blocked'?'btn-success':'btn-outline'}`} title="Block/Unblock" onClick={()=>toggleBlock(u.id)}>
                        {u.status==='Blocked' ? <CheckCircle size={12} /> : <Ban size={12} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} style={{textAlign:'center',padding:'40px',color:'var(--text-muted)'}}>No users match current filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span style={{fontSize:'13px',color:'var(--text-muted)'}}>Showing {filtered.length} of {data.length} users</span>
          <div className="pagination">
            {[1,2,3,4,5].map(p=><div key={p} className={`page-btn ${p===1?'active':''}`}>{p}</div>)}
            <div className="page-btn">›</div>
          </div>
        </div>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal" style={{width:'540px'}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Details — {selected.username}</h3>
              <button className="modal-close" onClick={()=>setSelected(null)}>✕</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[['User ID',selected.id],['Full Name',selected.fullName],['Email',selected.email],['Phone',selected.phone],['City',selected.city],['Join Date',selected.joinDate],['KYC Status',selected.kycStatus],['Doc Type',selected.doc],['Account Status',selected.status],['Wallet Balance','Rs.'+selected.wallet.toFixed(2)]].map(([k,v])=>(
                <div key={k} style={{background:'var(--bg)',borderRadius:'8px',padding:'12px'}}>
                  <div style={{fontSize:'11px',color:'var(--text-muted)',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.5px'}}>{k}</div>
                  <div style={{fontWeight:600,fontSize:'14px'}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger btn-sm" onClick={()=>toggleFlag(selected.id)}>{selected.flag?'Unflag User':'Flag User'}</button>
              <button className="btn btn-outline btn-sm" onClick={()=>setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
