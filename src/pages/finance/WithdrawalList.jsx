import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import Layout from '../../components/Layout';
import { toast } from '../../components/Toast';
import { withdrawals as initialData } from '../../data/mockData';

const statusBadge = s => s === 'Approved' ? 'badge-success' : s === 'Rejected' ? 'badge-danger' : 'badge-warning';

export default function WithdrawalList() {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState({ search: '', status: '', applyOn: 'Added Date', from: '', to: '' });
  const [selected, setSelected] = useState([]);

  const filtered = data.filter(w =>
    (!filter.status || w.status === filter.status) &&
    (!filter.search || w.username.includes(filter.search) || w.id.includes(filter.search))
  );

  const allChecked = filtered.length > 0 && filtered.every(w => selected.includes(w.id));
  const toggleAll = () => {
    if (allChecked) setSelected([]);
    else setSelected(filtered.map(w => w.id));
  };
  const toggleOne = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const doAction = (ids, action) => {
    setData(d => d.map(w => ids.includes(w.id) ? { ...w, status: action === 'approve' ? 'Approved' : 'Rejected' } : w));
    toast(action === 'approve' ? 'Withdrawal approved successfully' : 'Withdrawal rejected', action === 'approve' ? 'success' : 'error');
    setSelected([]);
  };

  const anySelected = selected.length > 0;

  return (
    <Layout title="Withdrawal">
      <div className="page-header">
        <p className="breadcrumb">Home / Manage Finance / <span>Withdrawal List</span></p>
        <h1>Withdrawal</h1>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>Filters</div>
        <div className="filter-row" style={{ flexWrap: 'wrap' }}>
          <div className="form-group">
            <label className="form-label">User / Phone</label>
            <input className="form-control" placeholder="Username or phone..." value={filter.search} onChange={e => setFilter({ ...filter, search: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Withdrawal Status</label>
            <select className="form-control" value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
              <option value="">All Status</option>
              <option>Pending</option><option>Approved</option><option>Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Apply Filter on</label>
            <select className="form-control" value={filter.applyOn} onChange={e => setFilter({ ...filter, applyOn: e.target.value })}>
              <option>Added Date</option>
              <option>Processed Date</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">From Date</label>
            <input type="date" className="form-control" value={filter.from} onChange={e => setFilter({ ...filter, from: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">To Date</label>
            <input type="date" className="form-control" value={filter.to} onChange={e => setFilter({ ...filter, to: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
            <button
              className="btn btn-sm btn-success"
              disabled={!anySelected}
              style={{ opacity: anySelected ? 1 : 0.5, cursor: anySelected ? 'pointer' : 'not-allowed' }}
              onClick={() => doAction(selected, 'approve')}
            >
              <CheckCircle size={13} /> Approve Selected
            </button>
            <button
              className="btn btn-sm btn-danger"
              disabled={!anySelected}
              style={{ opacity: anySelected ? 1 : 0.5, cursor: anySelected ? 'pointer' : 'not-allowed' }}
              onClick={() => doAction(selected, 'reject')}
            >
              <XCircle size={13} /> Reject Selected
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" checked={allChecked} onChange={toggleAll} /></th>
                <th>Unique ID</th><th>Username</th><th>Full Name</th><th>Mode</th>
                <th>Amount</th><th>Processing Fee</th><th>Payable</th>
                <th>Date</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td><input type="checkbox" checked={selected.includes(w.id)} onChange={() => toggleOne(w.id)} /></td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--primary)' }}>{w.id}</td>
                  <td><strong>{w.username}</strong></td>
                  <td>{w.fullName}</td>
                  <td><span className="badge badge-secondary">{w.paymentMode}</span></td>
                  <td style={{ fontWeight: 600 }}>Rs.{w.amount.toFixed(2)}</td>
                  <td style={{ color: 'var(--danger)', fontSize: '12px' }}>- Rs.{w.processingCharge.toFixed(2)}</td>
                  <td style={{ fontWeight: 700, color: 'var(--success)' }}>Rs.{w.actualPayable.toFixed(2)}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{w.addedDate}</td>
                  <td><span className={`badge ${statusBadge(w.status)}`}>{w.status}</span></td>
                  <td>
                    {w.status === 'Pending' ? (
                      <div className="flex gap-2">
                        <button className="btn btn-xs btn-success" onClick={() => doAction([w.id], 'approve')}>
                          <CheckCircle size={11} /> Approve
                        </button>
                        <button className="btn btn-xs btn-danger" onClick={() => doAction([w.id], 'reject')}>
                          <XCircle size={11} /> Reject
                        </button>
                      </div>
                    ) : <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={11} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No records found.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Showing {filtered.length} of {data.length} records</span>
          <div className="pagination">
            <div className="page-btn active">1</div><div className="page-btn">2</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
