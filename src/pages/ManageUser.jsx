import { useState } from 'react';
import Layout from '../components/Layout';
import { users } from '../data/mockData';

const statusBadge = (s) => {
  if (s === 'Active') return 'badge-success';
  if (s === 'Flagged') return 'badge-danger';
  if (s === 'Pending Docs') return 'badge-warning';
  return 'badge-secondary';
};

export default function ManageUser() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [data, setData] = useState(users);

  const tabs = ['All', 'Active', 'Pending Docs', 'Flagged'];
  const filtered = data.filter(u => {
    const matchTab = filter === 'All' || u.status === filter;
    const matchSearch = !search || u.username.includes(search) || u.email.includes(search) || u.id.includes(search);
    return matchTab && matchSearch;
  });

  const toggleFlag = (id) => setData(d => d.map(u => u.id===id ? {...u, flag:!u.flag, status: !u.flag?'Flagged':'Active'} : u));

  return (
    <Layout title="Manage User">
      <div className="page-header">
        <p className="breadcrumb">Home / User Management / <span>Manage User</span></p>
        <h1>Manage Users</h1>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div className="tabs" style={{marginBottom:0, borderBottom:'none'}}>
            {tabs.map(t => <div key={t} className={`tab ${filter===t?'active':''}`} style={{paddingTop:0}} onClick={()=>setFilter(t)}>{t}</div>)}
          </div>
          <input className="form-control" style={{width:'240px'}} placeholder="Search by username, email, ID..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>

        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Doc</th><th>Unique ID</th><th>Username</th><th>City</th>
              <th>Phone</th><th>Email</th><th>Status</th><th>Wallet (INR)</th><th>Flag</th>
            </tr></thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td><span title={u.doc}>📄</span> {u.doc}</td>
                  <td style={{fontFamily:'monospace', fontSize:'12px'}}>{u.id}</td>
                  <td><strong>{u.username}</strong><br/><span style={{fontSize:'11px',color:'var(--text-muted)'}}>{u.fullName}</span></td>
                  <td>{u.city}</td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>
                  <td><span className={`badge ${statusBadge(u.status)}`}>{u.status}</span></td>
                  <td style={{fontWeight:600}}>Rs.{u.wallet.toFixed(2)}</td>
                  <td>
                    <button className={`btn btn-xs ${u.flag ? 'btn-danger' : 'btn-outline'}`} onClick={()=>toggleFlag(u.id)}>
                      {u.flag ? '🚩 Flagged' : 'Flag'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="page-btn active">1</div>
          <div className="page-btn">2</div>
          <div className="page-btn">3</div>
          <div className="page-btn">&#8250;</div>
        </div>
      </div>
    </Layout>
  );
}
