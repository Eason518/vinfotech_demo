import { useState } from 'react';
import { Flag, Eye } from 'lucide-react';
import Layout from '../components/Layout';
import { toast } from '../components/Toast';
import { users as initialUsers } from '../data/mockData';

const statusBadge = (s) => {
  if (s === 'Active') return 'badge-success';
  if (s === 'Flagged') return 'badge-danger';
  if (s === 'Pending Docs') return 'badge-warning';
  if (s === 'Blocked') return 'badge-secondary';
  return 'badge-secondary';
};

export default function ManageUser() {
  const [data, setData] = useState(initialUsers);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState(false);
  const [pendingFilter, setPendingFilter] = useState(false);
  const [flaggedFilter, setFlaggedFilter] = useState(false);
  const [selected, setSelected] = useState(null);

  const pendingCount = data.filter(u => u.status === 'Pending Docs').length;
  const flaggedCount = data.filter(u => u.flag).length;

  const filtered = data.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q);
    const matchActive = !activeFilter || u.status === 'Active';
    const matchPending = !pendingFilter || u.status === 'Pending Docs';
    const matchFlagged = !flaggedFilter || u.flag;
    const matchDate = (!startDate || u.joinDate >= startDate) && (!endDate || u.joinDate <= endDate);
    return matchSearch && matchDate && ((!activeFilter && !pendingFilter && !flaggedFilter) || (matchActive || matchPending || matchFlagged));
  });

  const toggleFlag = (id) => {
    setData(d => d.map(u => u.id === id ? { ...u, flag: !u.flag, status: !u.flag ? 'Flagged' : (u.kycStatus === 'Verified' ? 'Active' : 'Pending Docs') } : u));
  };

  const unblockUser = (id) => {
    setData(d => d.map(u => u.id === id ? { ...u, status: 'Active' } : u));
    toast('User unblocked successfully', 'success');
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setSearch('');
    setActiveFilter(false);
    setPendingFilter(false);
    setFlaggedFilter(false);
  };

  return (
    <Layout title="Manage Users">
      <div className="page-header">
        <p className="breadcrumb">Home / User Management / <span>Manage User</span></p>
        <h1>Manage Users</h1>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="filter-row" style={{ marginBottom: '12px' }}>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">User</label>
            <input className="form-control" placeholder="Search username, email, ID..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn btn-sm"
            style={{ border: '1px solid #28a745', color: activeFilter ? '#fff' : '#28a745', background: activeFilter ? '#28a745' : 'transparent' }}
            onClick={() => setActiveFilter(!activeFilter)}
          >
            Active
          </button>
          <button
            className="btn btn-sm"
            style={{ border: '1px solid #ffc107', color: pendingFilter ? '#fff' : '#856404', background: pendingFilter ? '#ffc107' : 'transparent', position: 'relative' }}
            onClick={() => setPendingFilter(!pendingFilter)}
          >
            Pending Docs
            {pendingCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#dc3545', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{pendingCount}</span>
            )}
          </button>
          <button
            className="btn btn-sm"
            style={{ border: '1px solid #dc3545', color: flaggedFilter ? '#fff' : '#dc3545', background: flaggedFilter ? '#dc3545' : 'transparent', position: 'relative' }}
            onClick={() => setFlaggedFilter(!flaggedFilter)}
          >
            Flagged
            {flaggedCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#6c757d', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{flaggedCount}</span>
            )}
          </button>
          <button className="btn btn-outline btn-sm" onClick={handleClear}>Clear</button>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '8px' }}>Pending Docs: {pendingCount}</span>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Document</th><th>Unique ID</th><th>User name</th><th>City</th>
                <th>Phone</th><th>User Unblock</th><th>Email</th><th>Status</th><th>Wallet</th><th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td><span className="badge badge-secondary">{u.doc}</span></td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--primary)' }}>{u.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#3a7bd5,#6f42c1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '11px', flexShrink: 0 }}>
                        {u.username[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{u.username}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{u.city}</td>
                  <td>{u.phone}</td>
                  <td>
                    {u.status === 'Blocked' ? (
                      <button className="btn btn-xs btn-success" onClick={() => unblockUser(u.id)}>Unblock</button>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>-</span>
                    )}
                  </td>
                  <td style={{ fontSize: '12px' }}>{u.email}</td>
                  <td><span className={`badge ${statusBadge(u.status)}`}>{u.status}</span></td>
                  <td style={{ fontWeight: 600 }}>Rs.{u.wallet.toFixed(2)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline" title="View Details" onClick={() => setSelected(u)}><Eye size={12} /></button>
                      <button className={`btn btn-xs ${u.flag ? 'btn-danger' : 'btn-outline'}`} title="Flag User" onClick={() => toggleFlag(u.id)}>
                        <Flag size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No users match current filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Showing {filtered.length} of {data.length} users</span>
          <div className="pagination">
            {[1, 2, 3, 4, 5].map(p => <div key={p} className={`page-btn ${p === 1 ? 'active' : ''}`}>{p}</div>)}
            <div className="page-btn">›</div>
          </div>
        </div>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ width: '540px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Details — {selected.username}</h3>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[['User ID', selected.id], ['Full Name', selected.fullName], ['Email', selected.email], ['Phone', selected.phone], ['City', selected.city], ['Join Date', selected.joinDate], ['KYC Status', selected.kycStatus], ['Doc Type', selected.doc], ['Account Status', selected.status], ['Wallet Balance', 'Rs.' + selected.wallet.toFixed(2)]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg)', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger btn-sm" onClick={() => toggleFlag(selected.id)}>{selected.flag ? 'Unflag User' : 'Flag User'}</button>
              <button className="btn btn-outline btn-sm" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
