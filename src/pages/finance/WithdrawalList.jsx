import { useState } from 'react';
import Layout from '../../components/Layout';
import { withdrawals as initialData } from '../../data/mockData';

const statusBadge = (s) => s==='Approved'?'badge-success':s==='Rejected'?'badge-danger':'badge-warning';

export default function WithdrawalList() {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState({ status: '', from: '', to: '' });

  const filtered = data.filter(w =>
    (!filter.status || w.status === filter.status)
  );
  const pending = data.filter(w => w.status === 'Pending').length;

  const approve = (id) => setData(d => d.map(w => w.id===id ? {...w, status:'Approved'} : w));
  const reject = (id) => setData(d => d.map(w => w.id===id ? {...w, status:'Rejected'} : w));

  return (
    <Layout title="Withdrawal List">
      <div className="page-header">
        <p className="breadcrumb">Home / Manage Finance / <span>Withdrawal List</span></p>
        <div className="flex justify-between items-center">
          <h1>Withdrawal List</h1>
          <span className="badge badge-warning" style={{fontSize:'13px', padding:'6px 14px'}}>{pending} Pending</span>
        </div>
      </div>

      <div className="card">
        <div className="filter-row">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-control" value={filter.status} onChange={e=>setFilter({...filter,status:e.target.value})}>
              <option value="">All Status</option>
              <option>Pending</option><option>Approved</option><option>Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">From Date</label>
            <input type="date" className="form-control" value={filter.from} onChange={e=>setFilter({...filter,from:e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">To Date</label>
            <input type="date" className="form-control" value={filter.to} onChange={e=>setFilter({...filter,to:e.target.value})} />
          </div>
          <button className="btn btn-primary btn-sm">Search</button>
          <button className="btn btn-outline btn-sm">Export CSV</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Unique ID</th><th>Username</th><th>Full Name</th><th>Currency</th>
              <th>Amount</th><th>Processing Charge</th><th>Actual Payable</th>
              <th>Payment Mode</th><th>Added Date</th><th>Status</th><th>Action</th>
            </tr></thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td style={{fontFamily:'monospace',fontSize:'12px'}}>{w.id}</td>
                  <td><strong>{w.username}</strong></td>
                  <td>{w.fullName}</td>
                  <td>{w.currency}</td>
                  <td style={{fontWeight:600}}>Rs.{w.amount.toFixed(2)}</td>
                  <td style={{color:'var(--danger)'}}>Rs.{w.processingCharge.toFixed(2)}</td>
                  <td style={{fontWeight:600,color:'var(--success)'}}>Rs.{w.actualPayable.toFixed(2)}</td>
                  <td>{w.paymentMode}</td>
                  <td style={{fontSize:'12px'}}>{w.addedDate}</td>
                  <td><span className={`badge ${statusBadge(w.status)}`}>{w.status}</span></td>
                  <td>
                    {w.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button className="btn btn-xs btn-success" onClick={()=>approve(w.id)}>Approve</button>
                        <button className="btn btn-xs btn-danger" onClick={()=>reject(w.id)}>Reject</button>
                      </div>
                    )}
                    {w.status !== 'Pending' && <span style={{color:'var(--text-muted)',fontSize:'12px'}}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span style={{fontSize:'13px',color:'var(--text-muted)'}}>Showing {filtered.length} of {data.length} records</span>
          <div className="pagination">
            <div className="page-btn active">1</div>
            <div className="page-btn">2</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
