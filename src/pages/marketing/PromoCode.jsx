import { useState } from 'react';
import Layout from '../../components/Layout';
import { promoCodes as initial } from '../../data/mockData';

export default function PromoCode() {
  const [data, setData] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code:'', type:'Percentage', value:'', minDeposit:'', maxBonus:'', totalLimit:'', expiryDate:'', status:'Active' });

  const statusBadge = (s) => s==='Active' ? 'badge-success' : 'badge-secondary';
  const deleteCode = (id) => setData(d => d.filter(p => p.id !== id));
  const save = () => {
    setData(d => [...d, {...form, id:'PC'+(d.length+1).toString().padStart(3,'0'), usedCount:0, value:+form.value, minDeposit:+form.minDeposit, maxBonus:+form.maxBonus, totalLimit:+form.totalLimit}]);
    setShowModal(false);
  };

  return (
    <Layout title="Promo Code">
      <div className="page-header">
        <p className="breadcrumb">Home / Marketing / <span>Promo Code</span></p>
        <div className="flex justify-between items-center">
          <h1>Promo Codes</h1>
          <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Create Promo Code</button>
        </div>
      </div>
      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Code</th><th>Type</th><th>Value</th><th>Min Deposit</th>
              <th>Max Bonus</th><th>Used / Limit</th><th>Expiry</th><th>Status</th><th>Action</th>
            </tr></thead>
            <tbody>
              {data.map(p => (
                <tr key={p.id}>
                  <td><code style={{background:'#f0f2f4',padding:'2px 8px',borderRadius:'4px',fontWeight:700}}>{p.code}</code></td>
                  <td>{p.type}</td>
                  <td style={{fontWeight:600}}>{p.type==='Percentage' ? p.value+'%' : 'Rs.'+p.value}</td>
                  <td>Rs.{p.minDeposit}</td>
                  <td>Rs.{p.maxBonus}</td>
                  <td>{p.usedCount} / {p.totalLimit}</td>
                  <td>{p.expiryDate}</td>
                  <td><span className={`badge ${statusBadge(p.status)}`}>{p.status}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline">Edit</button>
                      <button className="btn btn-xs btn-danger" onClick={()=>deleteCode(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Promo Code</h3>
              <button className="modal-close" onClick={()=>setShowModal(false)}>x</button>
            </div>
            <div className="grid-2">
              {[['code','Promo Code'],['value','Discount Value'],['minDeposit','Min Deposit (INR)'],['maxBonus','Max Bonus (INR)'],['totalLimit','Total Limit'],['expiryDate','Expiry Date']].map(([k,l]) => (
                <div className="form-group" key={k}>
                  <label className="form-label">{l}</label>
                  <input className="form-control" type={k==='expiryDate'?'date':'text'} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} />
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-control" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  <option>Percentage</option><option>Flat</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Create</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
