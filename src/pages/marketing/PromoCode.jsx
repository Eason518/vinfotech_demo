import { useState } from 'react';
import { Plus, Edit2, Trash2, Copy, Tag, CheckCircle, XCircle, Hash } from 'lucide-react';
import Layout from '../../components/Layout';
import { promoCodes as initial } from '../../data/mockData';

export default function PromoCode() {
  const [data, setData] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [copied, setCopied] = useState(null);
  const [form, setForm] = useState({ code:'', type:'Percentage', value:'', minDeposit:'', maxBonus:'', totalLimit:'', expiryDate:'', status:'Active' });

  const statusBadge = s => s==='Active'?'badge-success':'badge-secondary';

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(()=>setCopied(null), 1500);
  };

  const openAdd = () => { setEditItem(null); setForm({code:'',type:'Percentage',value:'',minDeposit:'',maxBonus:'',totalLimit:'',expiryDate:'',status:'Active'}); setShowModal(true); };
  const openEdit = (p) => { setEditItem(p); setForm({code:p.code,type:p.type,value:String(p.value),minDeposit:String(p.minDeposit),maxBonus:String(p.maxBonus),totalLimit:String(p.totalLimit),expiryDate:p.expiryDate,status:p.status}); setShowModal(true); };
  const deleteCode = (id) => setData(d => d.filter(p => p.id !== id));
  const toggleStatus = (id) => setData(d => d.map(p => p.id===id ? {...p, status:p.status==='Active'?'Expired':'Active'} : p));

  const save = () => {
    if (editItem) {
      setData(d => d.map(p => p.id===editItem.id ? {...p,...form, value:+form.value, minDeposit:+form.minDeposit, maxBonus:+form.maxBonus, totalLimit:+form.totalLimit} : p));
    } else {
      setData(d => [...d, {...form, id:'PC'+(d.length+1).toString().padStart(3,'0'), usedCount:0, value:+form.value, minDeposit:+form.minDeposit, maxBonus:+form.maxBonus, totalLimit:+form.totalLimit}]);
    }
    setShowModal(false);
  };

  const totalUsed = data.reduce((s,p)=>s+p.usedCount,0);
  const activeCount = data.filter(p=>p.status==='Active').length;

  return (
    <Layout title="Promo Code">
      <div className="page-header">
        <p className="breadcrumb">Home / Marketing / <span>Promo Code</span></p>
        <div className="flex justify-between items-center">
          <h1>Promo Codes</h1>
          <button className="btn btn-primary btn-sm" onClick={openAdd}><Plus size={14}/> Create Promo Code</button>
        </div>
      </div>

      <div className="stats-grid" style={{marginBottom:'20px',gridTemplateColumns:'repeat(4,1fr)'}}>
        {[[Tag,'Total Codes',data.length,'#3a7bd5'],[CheckCircle,'Active',activeCount,'#28a745'],[XCircle,'Expired',data.filter(p=>p.status==='Expired').length,'#dc3545'],[Hash,'Total Redemptions',totalUsed,'#6f42c1']].map(([Icon,l,v,c])=>(
          <div key={l} className="stat-card">
            {typeof Icon !== 'string'
              ? <div style={{background:c+'18',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><Icon size={20} color={c}/></div>
              : <div style={{background:c+'18',borderRadius:'10px',width:38,height:38,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'10px',fontSize:'18px',fontWeight:900,color:c}}>{Icon}</div>
            }
            <div className="s-label">{l}</div>
            <div className="s-value" style={{fontSize:'22px',color:c}}>{v}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Promo Code</th><th>Type</th><th>Value</th><th>Min Deposit</th>
              <th>Max Bonus</th><th>Usage</th><th>Progress</th><th>Expiry</th><th>Status</th><th>Action</th>
            </tr></thead>
            <tbody>
              {data.map(p => {
                const usedPct = Math.min(100, Math.round((p.usedCount/p.totalLimit)*100));
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <code style={{background:p.status==='Active'?'#d4edda':'#e2e3e5',color:p.status==='Active'?'#155724':'#6c757d',padding:'3px 10px',borderRadius:'6px',fontWeight:800,fontSize:'13px',letterSpacing:'1px'}}>{p.code}</code>
                        <button className="btn btn-xs btn-outline" onClick={()=>copyCode(p.code)} title="Copy code">
                          {copied===p.code ? <CheckCircle size={11} color="#28a745"/> : <Copy size={11}/>}
                        </button>
                      </div>
                    </td>
                    <td><span className={`badge ${p.type==='Percentage'?'badge-info':'badge-primary'}`}>{p.type}</span></td>
                    <td style={{fontWeight:700,fontSize:'15px'}}>{p.type==='Percentage'?p.value+'%':'Rs.'+p.value}</td>
                    <td>Rs.{p.minDeposit}</td>
                    <td>Rs.{p.maxBonus}</td>
                    <td style={{fontWeight:600}}>{p.usedCount} <span style={{color:'var(--text-muted)',fontWeight:400}}>/ {p.totalLimit}</span></td>
                    <td style={{minWidth:'100px'}}>
                      <div style={{background:'#f0f2f4',borderRadius:'4px',height:'6px'}}>
                        <div style={{background:usedPct>80?'var(--danger)':'var(--primary)',height:'100%',borderRadius:'4px',width:usedPct+'%'}}></div>
                      </div>
                      <span style={{fontSize:'11px',color:'var(--text-muted)'}}>{usedPct}%</span>
                    </td>
                    <td style={{fontSize:'12px',color:new Date(p.expiryDate)<new Date()?'var(--danger)':'var(--text-muted)'}}>{p.expiryDate}</td>
                    <td>
                      <label className="toggle">
                        <input type="checkbox" checked={p.status==='Active'} onChange={()=>toggleStatus(p.id)} />
                        <span className="toggle-slider"></span>
                      </label>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-xs btn-outline" onClick={()=>openEdit(p)}><Edit2 size={11}/></button>
                        <button className="btn btn-xs btn-danger" onClick={()=>deleteCode(p.id)}><Trash2 size={11}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" style={{width:'540px'}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editItem?'Edit':'Create'} Promo Code</h3>
              <button className="modal-close" onClick={()=>setShowModal(false)}>✕</button>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Promo Code *</label>
                <input className="form-control" placeholder="e.g. SUMMER25" value={form.code} onChange={e=>setForm({...form,code:e.target.value.toUpperCase()})} style={{fontWeight:700,letterSpacing:'1px'}} />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-control" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  <option>Percentage</option><option>Flat</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Discount Value {form.type==='Percentage'?'(%)':'(Rs.)'} *</label>
                <input className="form-control" type="number" placeholder={form.type==='Percentage'?'e.g. 25':'e.g. 100'} value={form.value} onChange={e=>setForm({...form,value:e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Min Deposit (Rs.) *</label>
                <input className="form-control" type="number" value={form.minDeposit} onChange={e=>setForm({...form,minDeposit:e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Max Bonus (Rs.)</label>
                <input className="form-control" type="number" value={form.maxBonus} onChange={e=>setForm({...form,maxBonus:e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Usage Limit</label>
                <input className="form-control" type="number" value={form.totalLimit} onChange={e=>setForm({...form,totalLimit:e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Expiry Date *</label>
                <input className="form-control" type="date" value={form.expiryDate} onChange={e=>setForm({...form,expiryDate:e.target.value})} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={!form.code||!form.value||!form.expiryDate}>
                {editItem?'Save Changes':'Create Code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
