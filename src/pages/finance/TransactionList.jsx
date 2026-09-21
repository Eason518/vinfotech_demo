import { useState } from 'react';
import { Download, Search, ArrowUpCircle, ArrowDownCircle, RefreshCw, TrendingUp } from 'lucide-react';
import Layout from '../../components/Layout';
import { transactions } from '../../data/mockData';

export default function TransactionList() {
  const [filter, setFilter] = useState({ username:'', description:'', gameType:'', paymentType:'', search:'' });
  const [sort, setSort] = useState({ col:'date', dir:'desc' });

  const filtered = transactions.filter(t =>
    (!filter.description || t.description === filter.description) &&
    (!filter.gameType || t.gameType === filter.gameType) &&
    (!filter.paymentType || t.paymentType === filter.paymentType) &&
    (!filter.search || t.username.toLowerCase().includes(filter.search.toLowerCase()) ||
     t.transactionId.toLowerCase().includes(filter.search.toLowerCase()) ||
     t.orderId.toLowerCase().includes(filter.search.toLowerCase()))
  );

  const totalCredit = filtered.filter(t=>t.paymentType==='Credit').reduce((s,t)=>s+Math.abs(t.amount),0);
  const totalDebit = filtered.filter(t=>t.paymentType==='Debit').reduce((s,t)=>s+Math.abs(t.amount),0);

  const descIcon = (d) => d==='Deposit'?<ArrowUpCircle size={13} color="#28a745"/>:d==='Winning'?<TrendingUp size={13} color="#3a7bd5"/>:d==='Refund'?<RefreshCw size={13} color="#ffc107"/>:<ArrowDownCircle size={13} color="#dc3545"/>;

  return (
    <Layout title="Transaction List">
      <div className="page-header">
        <p className="breadcrumb">Home / Manage Finance / <span>Transaction List</span></p>
        <div className="flex justify-between items-center">
          <h1>Transaction List</h1>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export</button>
        </div>
      </div>

      <div className="stats-grid" style={{marginBottom:'20px',gridTemplateColumns:'repeat(4,1fr)'}}>
        <div className="stat-card">
          <div style={{background:'#28a74518',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><ArrowUpCircle size={20} color="#28a745"/></div>
          <div className="s-label">Total Credit</div>
          <div className="s-value" style={{fontSize:'20px',color:'var(--success)'}}>Rs.{totalCredit.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div style={{background:'#dc354518',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><ArrowDownCircle size={20} color="#dc3545"/></div>
          <div className="s-label">Total Debit</div>
          <div className="s-value" style={{fontSize:'20px',color:'var(--danger)'}}>Rs.{totalDebit.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div style={{background:'#3a7bd518',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><TrendingUp size={20} color="#3a7bd5"/></div>
          <div className="s-label">Transactions</div>
          <div className="s-value" style={{fontSize:'20px'}}>{filtered.length}</div>
        </div>
        <div className="stat-card">
          <div style={{background:'#6f42c118',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><RefreshCw size={20} color="#6f42c1"/></div>
          <div className="s-label">Net Flow</div>
          <div className="s-value" style={{fontSize:'20px',color:totalCredit-totalDebit>=0?'var(--success)':'var(--danger)'}}>
            {totalCredit-totalDebit>=0?'+':''}Rs.{Math.abs(totalCredit-totalDebit).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="filter-row" style={{marginBottom:'16px'}}>
          <div className="form-group" style={{position:'relative'}}>
            <label className="form-label">Search</label>
            <Search size={13} style={{position:'absolute',left:'9px',bottom:'9px',color:'var(--text-muted)'}} />
            <input className="form-control" style={{paddingLeft:'30px',minWidth:'200px'}} placeholder="Username, TXN ID, Order ID..." value={filter.search} onChange={e=>setFilter({...filter,search:e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <select className="form-control" value={filter.description} onChange={e=>setFilter({...filter,description:e.target.value})}>
              <option value="">All</option>
              <option>Deposit</option><option>Contest Join</option><option>Winning</option><option>Refund</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Game Type</label>
            <select className="form-control" value={filter.gameType} onChange={e=>setFilter({...filter,gameType:e.target.value})}>
              <option value="">All</option>
              <option>Cricket</option><option>Football</option><option>Kabaddi</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-control" value={filter.paymentType} onChange={e=>setFilter({...filter,paymentType:e.target.value})}>
              <option value="">All</option><option>Credit</option><option>Debit</option>
            </select>
          </div>
          <button className="btn btn-outline btn-sm" style={{alignSelf:'flex-end'}} onClick={()=>setFilter({username:'',description:'',gameType:'',paymentType:'',search:''})}>
            Reset
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Unique ID</th><th>Username</th><th>Order ID</th><th>Transaction ID</th>
              <th>Description</th><th>Game</th><th>Contest</th><th>Mode</th>
              <th>Type</th><th>Amount</th><th>Date</th>
            </tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{fontFamily:'monospace',fontSize:'11px',color:'var(--primary)'}}>{t.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div style={{width:26,height:26,borderRadius:'50%',background:'linear-gradient(135deg,#3a7bd5,#6f42c1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'10px',flexShrink:0}}>
                        {t.username[0].toUpperCase()}
                      </div>
                      <strong>{t.username}</strong>
                    </div>
                  </td>
                  <td style={{fontSize:'12px'}}>{t.orderId}</td>
                  <td style={{fontFamily:'monospace',fontSize:'11px'}}>{t.transactionId}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      {descIcon(t.description)}
                      <span>{t.description}</span>
                    </div>
                  </td>
                  <td style={{fontSize:'12px'}}>{t.gameType}</td>
                  <td style={{fontSize:'12px',maxWidth:'120px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.contest}</td>
                  <td><span className="badge badge-secondary">{t.paymentMode}</span></td>
                  <td><span className={`badge ${t.paymentType==='Credit'?'badge-success':'badge-danger'}`}>{t.paymentType}</span></td>
                  <td style={{fontWeight:700, color: t.amount>=0 ? 'var(--success)':'var(--danger)', fontSize:'14px'}}>
                    {t.amount>=0?'+':''}Rs.{Math.abs(t.amount).toFixed(2)}
                  </td>
                  <td style={{fontSize:'12px',color:'var(--text-muted)'}}>{t.date}</td>
                </tr>
              ))}
              {filtered.length===0 && <tr><td colSpan={11} style={{textAlign:'center',padding:'40px',color:'var(--text-muted)'}}>No transactions match the filter.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span style={{fontSize:'13px',color:'var(--text-muted)'}}>Showing {filtered.length} of {transactions.length} transactions</span>
          <div className="pagination">{[1,2,3].map(p=><div key={p} className={`page-btn ${p===1?'active':''}`}>{p}</div>)}</div>
        </div>
      </div>
    </Layout>
  );
}
