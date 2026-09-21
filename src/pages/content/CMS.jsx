import { useState } from 'react';
import { Plus, Edit2, Eye, Globe, FileText, CheckCircle, Clock } from 'lucide-react';
import Layout from '../../components/Layout';
import { cmsPages as initial } from '../../data/mockData';

const contentMap = {
  'About Us': 'Cricjam is India\'s premier fantasy sports platform. We offer an exciting gaming experience for cricket, football, and kabaddi enthusiasts.\n\nFounded in 2022, Cricjam has grown to serve over 48,000 registered users across India. Our platform offers real-time scoring, multiple contest formats, and instant withdrawals.',
  'Terms & Conditions': '1. Eligibility\nUsers must be 18 years or older to participate in paid contests.\n\n2. Account Registration\nEach user is allowed only one account. Multiple accounts will result in permanent ban.\n\n3. Deposits & Withdrawals\nAll deposits are processed instantly. Withdrawals are processed within 24-48 hours.',
  'Privacy Policy': 'We at Cricjam value your privacy. This policy describes how we collect, use, and protect your personal information.\n\n1. Information We Collect\nWe collect name, email, phone number, and payment information.\n\n2. How We Use It\nTo provide our services, process transactions, and send notifications.',
  'How to Play': '1. Register and complete KYC verification.\n2. Add funds to your wallet.\n3. Choose a match and select your fantasy team.\n4. Join a contest that fits your budget.\n5. Track live scores and win real cash prizes!',
  'FAQ': 'Q: How do I withdraw my winnings?\nA: Go to Wallet > Withdraw, enter the amount and your bank details.\n\nQ: What is the minimum withdrawal amount?\nA: The minimum withdrawal is Rs.100.\n\nQ: How long does KYC verification take?\nA: Usually 24-48 hours after document submission.',
};

export default function CMS() {
  const [pages, setPages] = useState(initial);
  const [editing, setEditing] = useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const toggleStatus = (id) => setPages(p => p.map(x => x.id===id ? {...x,status:x.status==='Published'?'Draft':'Published',lastUpdated:new Date().toISOString().slice(0,10)} : x));

  const openEdit = (p) => {
    setEditing(p);
    setTitle(p.title);
    setContent(contentMap[p.title] || `This is the content for the ${p.title} page.\n\nEdit this content to update the page.`);
    setPreviewMode(false);
  };

  const save = (status) => {
    setPages(p => p.map(x => x.id===editing.id ? {...x,title,status,lastUpdated:new Date().toISOString().slice(0,10)} : x));
    setEditing(null);
  };

  if (editing) {
    return (
      <Layout title="CMS - Edit Page">
        <div className="page-header">
          <p className="breadcrumb">Home / Content / CMS / <span>{editing.title}</span></p>
          <div className="flex justify-between items-center">
            <h1>Edit: {editing.title}</h1>
            <div className="flex gap-2">
              <button className={`btn btn-sm ${previewMode?'btn-primary':'btn-outline'}`} onClick={()=>setPreviewMode(m=>!m)}>
                <Eye size={14}/> {previewMode?'Edit Mode':'Preview'}
              </button>
              <button className="btn btn-outline btn-sm" onClick={()=>setEditing(null)}>← Back</button>
            </div>
          </div>
        </div>

        <div className="grid-2" style={{gap:'20px',alignItems:'start'}}>
          <div>
            <div className="card" style={{marginBottom:'16px'}}>
              <div className="form-group" style={{marginBottom:0}}>
                <label className="form-label">Page Title</label>
                <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} style={{fontSize:'16px',fontWeight:600}} />
              </div>
            </div>
            <div className="card">
              <div className="flex justify-between items-center" style={{marginBottom:'12px'}}>
                <label className="form-label" style={{marginBottom:0}}>Content</label>
                <div className="flex gap-1">
                  {['B','I','U','H1','H2','• List'].map(f=>(
                    <button key={f} className="btn btn-xs btn-outline" style={{fontWeight:f==='B'?700:f==='I'?'normal':400, fontStyle:f==='I'?'italic':'normal', textDecoration:f==='U'?'underline':'none'}}>{f}</button>
                  ))}
                </div>
              </div>
              {previewMode ? (
                <div style={{minHeight:'300px',padding:'16px',background:'var(--bg)',borderRadius:'8px',fontSize:'14px',lineHeight:'1.8',whiteSpace:'pre-wrap'}}>
                  <h2 style={{marginBottom:'12px',fontWeight:700}}>{title}</h2>
                  {content}
                </div>
              ) : (
                <textarea className="form-control" rows={14} value={content} onChange={e=>setContent(e.target.value)} style={{fontFamily:'inherit',lineHeight:1.7,resize:'vertical'}} />
              )}
              <div className="flex gap-2 mt-4">
                <button className="btn btn-primary" onClick={()=>save('Published')}><CheckCircle size={14}/> Publish</button>
                <button className="btn btn-outline" onClick={()=>save('Draft')}><Clock size={14}/> Save Draft</button>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <div className="card-title">Page Settings</div>
              {[['URL Slug',`/${editing.slug}`],['Last Updated',editing.lastUpdated],['Status',editing.status],['Page ID','#'+editing.id]].map(([k,v])=>(
                <div key={k} style={{padding:'10px 0',borderBottom:'1px solid #f5f5f5'}}>
                  <div style={{fontSize:'11px',color:'var(--text-muted)',marginBottom:'3px',textTransform:'uppercase',letterSpacing:'0.5px'}}>{k}</div>
                  <div style={{fontWeight:500,fontSize:'13px'}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{marginTop:'16px'}}>
              <div className="card-title">SEO</div>
              <div className="form-group">
                <label className="form-label">Meta Title</label>
                <input className="form-control" defaultValue={title+' | Cricjam'} />
              </div>
              <div className="form-group">
                <label className="form-label">Meta Description</label>
                <textarea className="form-control" rows={3} defaultValue={'Read our '+title+' page for more information about Cricjam.'} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="CMS">
      <div className="page-header">
        <p className="breadcrumb">Home / Content Management / <span>CMS</span></p>
        <div className="flex justify-between items-center">
          <h1>Content Management System</h1>
          <button className="btn btn-primary btn-sm"><Plus size={14}/> Add New Page</button>
        </div>
      </div>

      <div className="stats-grid" style={{marginBottom:'20px',gridTemplateColumns:'repeat(3,1fr)'}}>
        {[[Globe,'Published Pages',pages.filter(p=>p.status==='Published').length,'#28a745'],[Clock,'Draft Pages',pages.filter(p=>p.status==='Draft').length,'#ffc107'],[FileText,'Total Pages',pages.length,'#3a7bd5']].map(([Icon,l,v,c])=>(
          <div key={l} className="stat-card">
            <div style={{background:c+'18',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><Icon size={20} color={c}/></div>
            <div className="s-label">{l}</div>
            <div className="s-value" style={{fontSize:'24px',color:c}}>{v}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Page Title</th><th>URL</th><th>Last Updated</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {pages.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div style={{width:32,height:32,borderRadius:'8px',background:p.status==='Published'?'#d4edda':'#e2e3e5',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        {p.status==='Published'?<Globe size={14} color="#28a745"/>:<Clock size={14} color="#6c757d"/>}
                      </div>
                      <strong>{p.title}</strong>
                    </div>
                  </td>
                  <td><code style={{fontSize:'12px',color:'var(--primary)',background:'#f0f6ff',padding:'2px 8px',borderRadius:'4px'}}>/{p.slug}</code></td>
                  <td style={{color:'var(--text-muted)',fontSize:'13px'}}>{p.lastUpdated}</td>
                  <td><span className={`badge ${p.status==='Published'?'badge-success':'badge-secondary'}`}>{p.status}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline" onClick={()=>openEdit(p)}><Edit2 size={11}/> Edit</button>
                      <button className="btn btn-xs btn-outline" onClick={()=>toggleStatus(p.id)}>{p.status==='Published'?'Unpublish':'Publish'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
