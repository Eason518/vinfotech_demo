import { useState } from 'react';
import Layout from '../../components/Layout';
import { cmsPages as initial } from '../../data/mockData';

export default function CMS() {
  const [pages, setPages] = useState(initial);
  const [editing, setEditing] = useState(null);
  const [content, setContent] = useState('');
  const toggleStatus = (id) => setPages(p => p.map(x => x.id===id ? {...x, status: x.status==='Published'?'Draft':'Published'} : x));
  const openEdit = (p) => { setEditing(p); setContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is the content for '+p.title+'.'); };
  return (
    <Layout title="CMS">
      <div className="page-header"><p className="breadcrumb">Home / Content Management / <span>CMS</span></p><h1>Content Management System</h1></div>
      {editing ? (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 style={{fontWeight:600}}>Editing: {editing.title}</h2>
            <button className="btn btn-outline btn-sm" onClick={()=>setEditing(null)}>Back to List</button>
          </div>
          <div className="form-group">
            <label className="form-label">Page Title</label>
            <input className="form-control" defaultValue={editing.title} />
          </div>
          <div className="form-group">
            <label className="form-label">URL Slug</label>
            <input className="form-control" defaultValue={editing.slug} />
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea className="form-control" rows={10} value={content} onChange={e=>setContent(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={()=>setEditing(null)}>Publish</button>
            <button className="btn btn-outline">Save Draft</button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="table-wrapper"><table>
            <thead><tr><th>Page Title</th><th>Slug</th><th>Last Updated</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{pages.map(p => (
              <tr key={p.id}>
                <td><strong>{p.title}</strong></td>
                <td><code style={{fontSize:'12px',color:'var(--primary)'}}>/{p.slug}</code></td>
                <td>{p.lastUpdated}</td>
                <td><span className={`badge ${p.status==='Published'?'badge-success':'badge-secondary'}`}>{p.status}</span></td>
                <td><div className="flex gap-2">
                  <button className="btn btn-xs btn-outline" onClick={()=>openEdit(p)}>Edit</button>
                  <button className="btn btn-xs btn-outline" onClick={()=>toggleStatus(p.id)}>{p.status==='Published'?'Unpublish':'Publish'}</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table></div>
        </div>
      )}
    </Layout>
  );
}
