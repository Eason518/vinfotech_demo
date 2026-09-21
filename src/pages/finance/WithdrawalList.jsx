import { useState } from 'react';
import { CheckCircle, XCircle, Download, Search } from 'lucide-react';
import Layout from '../../components/Layout';
import { toast } from '../../components/Toast';
import { withdrawals as initialData } from '../../data/mockData';

const statusBadge = s => s==='Approved'?'badge-success':s==='Rejected'?'badge-danger':'badge-warning';

export default function WithdrawalList() {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState({ status:'', from:'', to:'', search:'' });
  const [confirmModal, setConfirmModal] = useState(null);

  const filtered = data.filter(w =>
    (!filter.status || w.status === filter.status) &&
    (!filter.search || w.username.includes(filter.search) || w.id.includes(filter.search))
  );

  const pending = data.filter(w => w.status === 'Pending').length;
  const totalPending = data.filter(w=>w.status==='Pending').reduce((s,w)=>s+w.actualPayable,0);

  const doAction = (id, action) => {
    setData(d => d.map(w => w.id===id ? {...w, status: action==='approve'?'Approved':'Rejected'} : w));
    toast(action==='approve' ? 'Withdrawal approved successfully' : 'Withdrawal rejected', action==='approve'?'success':'error');
    setConfirmModal(null);
  };

  return (
    <Layout title="Withdrawal List">
      <div className="page-header">
        <p className="breadcrumb">Home / Manage Finance / <span>Withdrawal List</span></p>
        <div className="flex justify-between items-center">
          <h1>Withdrawal List</h1>
          <div className="flex gap-2">
            <div className="stat-card" style={{padding:'10px 16px',display:'flex',gap:'12px',alignItems:'center'}}>
              <div><div style={{fontSize:'11px',color:'var(--text-muted)'}}>Pending</div><div style={{fontWeight:700,fontSize:'18px',color:'var(--warning)'}}>{pending}</div></div>
            </div>
            <div className="stat-card" style={{padding:'10px 16px',display:'flex',gap:'12px',alignItems:'center'}}>
              <div><div style={{fontSize:'11px',color:'var(--text-muted)'}}>Pending Amount</div><div style={{fontWeight:700,fontSize:'18px',color:'var(--danger)'}}>Rs.{totalPending.toFixed(0)}</div></div>
            </div>
          </div>
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
          <div className="form-group" style={{position:'relative'}}>
            <label className="form-label">Search</label>
            <Search size={13} style={{position:'absolute',left:'10px',bottom:'9px',color:'var(--text-muted)'}} />
            <input className="form-control" style={{paddingLeft:'30px'}} placeholder="Username or ID..." value={filter.search} onChange={e=>setFilter({...filter,search:e.target.value})} />
          </div>
          <button className="btn btn-outline btn-sm" style={{alignSelf:'flex-end'}} onClick={()=>toast('Export started','info')}><Download size={14} /> Export CSV</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Unique ID</th><th>Username</th><th>Full Name</th><th>Mode</th>
              <th>Amount</th><th>Processing Fee</th><th>Payable</th>
              <th>Date</th><th>Status</th><th>Action</th>
            </tr></thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td style={{fontFamily:'monospace',fontSize:'12px',color:'var(--primary)'}}>{w.id}</td>
                  <td><strong>{w.username}</strong></td>
                  <td>{w.fullName}</td>
                  <td><span className="badge badge-secondary">{w.paymentMode}</span></td>
                  <td style={{fontWeight:600}}>Rs.{w.amount.toFixed(2)}</td>
                  <td style={{color:'var(--danger)',fontSize:'12px'}}>- Rs.{w.processingCharge.toFixed(2)}</td>
                  <td style={{fontWeight:700,color:'var(--success)'}}>Rs.{w.actualPayable.toFixed(2)}</td>
                  <td style={{fontSize:'12px',color:'var(--text-muted)'}}>{w.addedDate}</td>
                  <td><span className={`badge ${statusBadge(w.status)}`}>{w.status}</span></td>
                  <td>
                    {w.status === 'Pending' ? (
                      <div className="flex gap-2">
                        <button className="btn btn-xs btn-success" onClick={()=>setConfirmModal({id:w.id,action:'approve',name:w.username,amount:w.actualPayable})}>
                          <CheckCircle size={11} /> Approve
                        </button>
                        <button className="btn btn-xs btn-danger" onClick={()=>setConfirmModal({id:w.id,action:'reject',name:w.username,amount:w.amount})}>
                          <XCircle size={11} /> Reject
                        </button>
                      </div>
                    ) : <span style={{color:'var(--text-muted)',fontSize:'12px'}}>—</span>}
                  </td>
                </tr>
              ))}
              {filtered.length===0 && <tr><td colSpan={10} style={{textAlign:'center',padding:'40px',color:'var(--text-muted)'}}>No records found.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span style={{fontSize:'13px',color:'var(--text-muted)'}}>Showing {filtered.length} of {data.length} records</span>
          <div className="pagination">
            <div className="page-btn active">1</div><div className="page-btn">2</div>
          </div>
        </div>
      </div>

      {confirmModal && (
        <div className="modal-overlay" onClick={()=>setConfirmModal(null)}>
          <div className="modal" style={{width:'400px'}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>{confirmModal.action==='approve'?'Approve':'Reject'} Withdrawal</h3>
              <button className="modal-close" onClick={()=>setConfirmModal(null)}>✕</button>
            </div>
            <p style={{color:'var(--text-muted)',marginBottom:'16px'}}>
              {confirmModal.action==='approve'
                ? `Approve Rs.${confirmModal.amount.toFixed(2)} for ${confirmModal.name}?`
                : `Reject withdrawal request for ${confirmModal.name}?`}
            </p>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setConfirmModal(null)}>Cancel</button>
              <button className={`btn ${confirmModal.action==='approve'?'btn-success':'btn-danger'}`} onClick={()=>doAction(confirmModal.id, confirmModal.action)}>
                {confirmModal.action==='approve'?'Yes, Approve':'Yes, Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
