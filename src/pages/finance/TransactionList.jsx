import { useState } from 'react';
import Layout from '../../components/Layout';
import { transactions } from '../../data/mockData';

export default function TransactionList() {
  const [filter, setFilter] = useState({ username:'', description:'', gameType:'', paymentType:'' });

  const filtered = transactions.filter(t =>
    (!filter.username || t.username.includes(filter.username)) &&
    (!filter.description || t.description === filter.description) &&
    (!filter.gameType || t.gameType === filter.gameType) &&
    (!filter.paymentType || t.paymentType === filter.paymentType)
  );

  return (
    <Layout title="Transaction List">
      <div className="page-header">
        <p className="breadcrumb">Home / Manage Finance / <span>Transaction List</span></p>
        <h1>Transaction List</h1>
      </div>
      <div className="card">
        <div className="filter-row">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-control" placeholder="Search username..." value={filter.username} onChange={e=>setFilter({...filter,username:e.target.value})} />
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
            <label className="form-label">Payment Type</label>
            <select className="form-control" value={filter.paymentType} onChange={e=>setFilter({...filter,paymentType:e.target.value})}>
              <option value="">All</option><option>Credit</option><option>Debit</option>
            </select>
          </div>
          <button className="btn btn-primary btn-sm">Search</button>
          <button className="btn btn-outline btn-sm">Export</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Unique ID</th><th>Username</th><th>Order ID</th><th>Transaction ID</th>
              <th>Description</th><th>Game Type</th><th>Contest</th><th>Payment Mode</th>
              <th>Type</th><th>Amount</th><th>Date</th>
            </tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{fontFamily:'monospace',fontSize:'11px'}}>{t.id}</td>
                  <td><strong>{t.username}</strong></td>
                  <td style={{fontSize:'12px'}}>{t.orderId}</td>
                  <td style={{fontFamily:'monospace',fontSize:'11px'}}>{t.transactionId}</td>
                  <td>{t.description}</td>
                  <td>{t.gameType}</td>
                  <td style={{fontSize:'12px'}}>{t.contest}</td>
                  <td>{t.paymentMode}</td>
                  <td><span className={`badge ${t.paymentType==='Credit'?'badge-success':'badge-danger'}`}>{t.paymentType}</span></td>
                  <td style={{fontWeight:600, color: t.amount>=0 ? 'var(--success)':'var(--danger)'}}>
                    Rs.{Math.abs(t.amount).toFixed(2)}
                  </td>
                  <td style={{fontSize:'12px'}}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="page-btn active">1</div>
          <div className="page-btn">2</div>
        </div>
      </div>
    </Layout>
  );
}
