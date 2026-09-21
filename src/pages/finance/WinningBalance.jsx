import { useState } from 'react';
import Layout from '../../components/Layout';
import { winningBalances } from '../../data/mockData';

export default function WinningBalance() {
  const [search, setSearch] = useState('');
  const total = winningBalances.reduce((s,w) => s + w.winningBalance, 0);
  const filtered = winningBalances.filter(w => !search || w.username.includes(search) || w.email.includes(search));

  return (
    <Layout title="Winning Balance">
      <div className="page-header">
        <p className="breadcrumb">Home / Manage Finance / <span>Winning Balance</span></p>
        <h1>Winning Balance Report</h1>
      </div>
      <div className="card mb-4" style={{textAlign:'center', padding:'32px'}}>
        <div style={{fontSize:'13px',color:'var(--text-muted)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'1px'}}>Total Winning Balance</div>
        <div style={{fontSize:'48px',fontWeight:'800',color:'var(--primary)'}}>Rs.{total.toLocaleString('en-IN', {maximumFractionDigits:2})}</div>
        <div style={{fontSize:'13px',color:'var(--text-muted)',marginTop:'6px'}}>Across {winningBalances.length} users</div>
      </div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div className="card-title" style={{marginBottom:0}}>User Winning Balances</div>
          <div className="flex gap-2">
            <input className="form-control" style={{width:'220px'}} placeholder="Search username or email..." value={search} onChange={e=>setSearch(e.target.value)} />
            <button className="btn btn-outline btn-sm">Export</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Unique ID</th><th>Username</th><th>Full Name</th><th>Email</th><th>Mobile</th><th>Winning Balance</th>
            </tr></thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td style={{fontFamily:'monospace',fontSize:'12px'}}>{w.id}</td>
                  <td><strong>{w.username}</strong></td>
                  <td>{w.fullName}</td>
                  <td>{w.email}</td>
                  <td>{w.mobile}</td>
                  <td style={{fontWeight:700,color:'var(--success)',fontSize:'15px'}}>Rs.{w.winningBalance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
