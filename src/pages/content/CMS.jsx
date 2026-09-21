import { useState } from "react";
import { Edit2, Eye, Plus } from "lucide-react";
import Layout from "../../components/Layout";
import { cmsPages as initial } from "../../data/mockData";
import { toast } from "../../components/Toast";

export default function CMS() {
  const [pages, setPages] = useState(initial);
  const [editing, setEditing] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [helpCenter, setHelpCenter] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const toggleStatus = (id) => {
    setPages(p => p.map(x => x.id===id ? {...x,status:x.status==="Published"?"Draft":"Published",lastUpdated:new Date().toISOString().slice(0,10)} : x));
    toast("Page status updated","success");
  };

  const openEdit = (p) => {
    setEditing(p); setTitle(p.title); setPreviewMode(false);
    setContent("This is the content for the "+p.title+" page.\n\nEdit this content to update the page on the platform.");
  };

  const save = (status) => {
    setPages(p => p.map(x => x.id===editing.id ? {...x,title,status,lastUpdated:new Date().toISOString().slice(0,10)} : x));
    toast(status==="Published"?"Page published":"Saved as draft","success");
    setEditing(null);
  };

  if (editing) {
    return (
      <Layout title="Manage Pages">
        <div className="page-header">
          <p className="breadcrumb">Home / Content / CMS / <span>{editing.title}</span></p>
          <div className="flex justify-between items-center">
            <h1>Edit: {editing.title}</h1>
            <div className="flex gap-2">
              <button className={`btn btn-sm ${previewMode?"btn-primary":"btn-outline"}`} onClick={()=>setPreviewMode(m=>!m)}>
                <Eye size={14}/> {previewMode?"Edit Mode":"Preview"}
              </button>
              <button className="btn btn-outline btn-sm" onClick={()=>setEditing(null)}>← Back</button>
            </div>
          </div>
        </div>
        <div className="grid-2" style={{gap:"20px",alignItems:"start"}}>
          <div>
            <div className="card" style={{marginBottom:"16px"}}>
              <div className="form-group" style={{marginBottom:0}}>
                <label className="form-label">Page Title</label>
                <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} style={{fontSize:"16px",fontWeight:600}}/>
              </div>
            </div>
            <div className="card">
              <div className="flex justify-between items-center" style={{marginBottom:"12px"}}>
                <label className="form-label" style={{marginBottom:0}}>Content</label>
                <div className="flex gap-1">
                  {["B","I","U","H1","H2"].map(f=>(
                    <button key={f} className="btn btn-xs btn-outline">{f}</button>
                  ))}
                </div>
              </div>
              {previewMode ? (
                <div style={{minHeight:"280px",padding:"16px",background:"var(--bg)",borderRadius:"8px",fontSize:"14px",lineHeight:"1.8",whiteSpace:"pre-wrap"}}>
                  <h2 style={{marginBottom:"12px",fontWeight:700}}>{title}</h2>{content}
                </div>
              ) : (
                <textarea className="form-control" rows={12} value={content} onChange={e=>setContent(e.target.value)} style={{fontFamily:"inherit",lineHeight:1.7,resize:"vertical"}}/>
              )}
              <div className="flex gap-2 mt-4">
                <button className="btn btn-primary" onClick={()=>save("Published")}>Publish</button>
                <button className="btn btn-outline" onClick={()=>save("Draft")}>Save Draft</button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">Page Settings</div>
            {[["Alias","/"+editing.slug],["Last Updated",editing.lastUpdated],["Status",editing.status]].map(([k,v])=>(
              <div key={k} style={{padding:"10px 0",borderBottom:"1px solid #f5f5f5"}}>
                <div style={{fontSize:"11px",color:"var(--text-muted)",marginBottom:"3px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{k}</div>
                <div style={{fontWeight:500,fontSize:"13px"}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Manage Pages">
      <div className="page-header">
        <p className="breadcrumb">Home / Content Management / <span>CMS</span></p>
        <div className="flex justify-between items-center">
          <h1>Manage Pages</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span style={{fontSize:"13px",color:"var(--text-muted)"}}>Help Center</span>
              <label className="toggle">
                <input type="checkbox" checked={helpCenter} onChange={e=>{setHelpCenter(e.target.checked); toast("Help Center "+(e.target.checked?"enabled":"disabled"),"info");}}/>
                <span className="toggle-slider"></span>
              </label>
            </div>
            <button className="btn btn-danger btn-sm" onClick={()=>toast("Edit mode","info")}>
              <Edit2 size={13}/> Edit
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Title</th><th>Alias</th><th>Updated Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {pages.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.title}</strong></td>
                  <td><code style={{fontSize:"12px",color:"var(--primary)"}}>/{p.slug}</code></td>
                  <td style={{color:"var(--text-muted)",fontSize:"13px"}}>{p.lastUpdated}</td>
                  <td><span className={`badge ${p.status==="Published"?"badge-success":"badge-secondary"}`}>{p.status}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline" onClick={()=>openEdit(p)}><Edit2 size={11}/> Edit</button>
                      <button className="btn btn-xs btn-outline" onClick={()=>toggleStatus(p.id)}>{p.status==="Published"?"Unpublish":"Publish"}</button>
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
