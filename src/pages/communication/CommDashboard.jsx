import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Send, Mail, Bell, Users, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { notifications } from '../../data/mockData';

const reachData = [
  { date:'Mar 15', reach:48293 },{ date:'Mar 16', reach:12000 },{ date:'Mar 17', reach:0 },
  { date:'Mar 18', reach:31204 },{ date:'Mar 19', reach:0 },{ date:'Mar 20', reach:8400 },
];

export default function CommDashboard() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const typeBadge = t => t==='Promotional'?'badge-primary':t==='Contest'?'badge-success':'badge-secondary';

  return (
    <Layout title="Communication">
      <div className="page-header">
        <p className="breadcrumb">Home / Communication / <span>Dashboard</span></p>
        <div className="flex justify-between items-center">
          <h1>Communication Dashboard</h1>
          <button className="btn btn-primary btn-sm" onClick={()=>navigate('/communication/email-push')}>
            <Plus size={14} /> New Notification
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{marginBottom:'20px',gridTemplateColumns:'repeat(4,1fr)'}}>
        {[[Send,'Total Sent',2,'#3a7bd5'],[Bell,'Drafts',1,'#ffc107'],[Users,'Total Reach','79,497','#28a745'],[Eye,'Avg. Open Rate','34.2%','#6f42c1']].map(([Icon,l,v,c])=>(
          <div key={l} className="stat-card">
            <div style={{background:c+'18',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><Icon size={20} color={c}/></div>
            <div className="s-label">{l}</div>
            <div className="s-value" style={{fontSize:'22px',color:c}}>{v}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{marginBottom:'20px'}}>
        <div className="card">
          <div className="card-title">Notification Reach by Date</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={reachData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{fontSize:12}} />
              <YAxis tick={{fontSize:11}} tickFormatter={v=>v?v.toLocaleString():0} />
              <Tooltip formatter={v=>[v.toLocaleString(),'Users Reached']} />
              <Bar dataKey="reach" fill="#3a7bd5" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">Channel Breakdown</div>
          <div style={{padding:'16px 0'}}>
            {[['Push Notifications','68%','#3a7bd5'],['Email','28%','#28a745'],['Both','4%','#6f42c1']].map(([l,p,c])=>(
              <div key={l} style={{marginBottom:'16px'}}>
                <div className="flex justify-between" style={{marginBottom:'6px'}}>
                  <span style={{fontSize:'13px'}}>{l}</span>
                  <span style={{fontWeight:700,color:c}}>{p}</span>
                </div>
                <div style={{background:'#f0f2f4',borderRadius:'6px',height:'8px'}}>
                  <div style={{background:c,height:'100%',borderRadius:'6px',width:p,transition:'width 0.5s'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center" style={{marginBottom:'16px'}}>
          <div className="card-title" style={{marginBottom:0}}>Notification History</div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Title</th><th>Type</th><th>Channel</th><th>Reach</th><th>Open Rate</th><th>Sent Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {[...notifications, { id:4, title:'Weekend Booster', body:'Play this weekend and get 2x points on all contests!', type:'Promotional', sent:'2024-03-20', status:'Scheduled', reach:0 }].map(n => (
                <tr key={n.id}>
                  <td>
                    <div style={{fontWeight:600,fontSize:'13px'}}>{n.title}</div>
                    <div style={{fontSize:'11px',color:'var(--text-muted)',marginTop:'2px'}}>{n.body.substring(0,60)}...</div>
                  </td>
                  <td><span className={`badge ${typeBadge(n.type)}`}>{n.type}</span></td>
                  <td><div className="flex gap-1">{n.status!=='Draft'&&<><Bell size={12} color="#3a7bd5"/><Mail size={12} color="#28a745"/></>}{n.status==='Draft'&&<span style={{fontSize:'12px',color:'var(--text-muted)'}}>—</span>}</div></td>
                  <td>{n.reach>0?n.reach.toLocaleString():'—'}</td>
                  <td>{n.reach>0?(n.id===1?'34%':n.id===2?'28%':n.id===3?'—':'—'):'—'}</td>
                  <td style={{fontSize:'12px',color:'var(--text-muted)'}}>{n.sent}</td>
                  <td><span className={`badge ${n.status==='Sent'?'badge-success':n.status==='Draft'?'badge-secondary':'badge-info'}`}>{n.status}</span></td>
                  <td><button className="btn btn-xs btn-outline" onClick={()=>setPreview(n)}><Eye size={11}/> View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {preview && (
        <div className="modal-overlay" onClick={()=>setPreview(null)}>
          <div className="modal" style={{width:'420px'}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>Notification Preview</h3>
              <button className="modal-close" onClick={()=>setPreview(null)}>✕</button>
            </div>
            <div style={{background:'#1a2035',borderRadius:'12px',padding:'20px',color:'#fff',marginBottom:'16px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
                <div style={{width:36,height:36,borderRadius:'8px',background:'var(--primary)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>🏏</div>
                <div>
                  <div style={{fontWeight:700,fontSize:'14px'}}>CRICJAM</div>
                  <div style={{fontSize:'11px',opacity:0.6}}>now</div>
                </div>
              </div>
              <div style={{fontWeight:700,fontSize:'15px',marginBottom:'6px'}}>{preview.title}</div>
              <div style={{fontSize:'13px',opacity:0.85,lineHeight:1.5}}>{preview.body}</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
              {[['Type',preview.type],['Status',preview.status],['Sent',preview.sent],['Reach',preview.reach>0?preview.reach.toLocaleString():'—']].map(([k,v])=>(
                <div key={k} style={{background:'var(--bg)',borderRadius:'8px',padding:'10px'}}>
                  <div style={{fontSize:'11px',color:'var(--text-muted)',marginBottom:'3px'}}>{k}</div>
                  <div style={{fontWeight:600}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={()=>setPreview(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
