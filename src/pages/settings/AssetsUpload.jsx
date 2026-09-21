import { useState } from 'react';
import Layout from '../../components/Layout';

export default function AssetsUpload() {
  const [uploaded, setUploaded] = useState([
    { name: 'app-logo.png', size: '24 KB', type: 'Logo', date: '2024-03-10', url: '' },
    { name: 'banner-ipl.jpg', size: '186 KB', type: 'Banner', date: '2024-03-15', url: '' },
    { name: 'splash-screen.png', size: '94 KB', type: 'Splash', date: '2024-03-01', url: '' },
  ]);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(f => {
      setUploaded(prev => [...prev, { name: f.name, size: (f.size/1024).toFixed(0)+' KB', type: 'Uploaded', date: new Date().toISOString().slice(0,10), url: '' }]);
    });
  };

  return (
    <Layout title="Assets Upload">
      <div className="page-header">
        <p className="breadcrumb">Home / Settings / <span>Assets Upload</span></p>
        <h1>Assets Upload</h1>
      </div>
      <div className="card mb-4">
        <div className="card-title">Upload New Asset</div>
        <div
          style={{ border: `2px dashed ${dragging?'var(--primary)':'var(--border)'}`, borderRadius:'10px', padding:'48px', textAlign:'center', cursor:'pointer', background: dragging?'#f0f6ff':'transparent', transition:'all 0.2s' }}
          onDragOver={e=>{e.preventDefault();setDragging(true)}}
          onDragLeave={()=>setDragging(false)}
          onDrop={handleDrop}
          onClick={()=>document.getElementById('file-input').click()}
        >
          <div style={{fontSize:'48px',marginBottom:'12px'}}>📁</div>
          <p style={{fontWeight:600,marginBottom:'6px'}}>Drag and drop files here</p>
          <p style={{fontSize:'12px',color:'var(--text-muted)'}}>or click to browse. Supports PNG, JPG, SVG, MP4 up to 10MB</p>
          <input id="file-input" type="file" multiple style={{display:'none'}} onChange={e=>{
            Array.from(e.target.files).forEach(f => {
              setUploaded(prev => [...prev, { name: f.name, size: (f.size/1024).toFixed(0)+' KB', type: 'Uploaded', date: new Date().toISOString().slice(0,10) }]);
            });
          }} />
        </div>
      </div>
      <div className="card">
        <div className="card-title">Uploaded Assets</div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>File Name</th><th>Type</th><th>Size</th><th>Upload Date</th><th>Action</th></tr></thead>
            <tbody>
              {uploaded.map((f,i) => (
                <tr key={i}>
                  <td><span style={{marginRight:'8px'}}>🖼️</span>{f.name}</td>
                  <td><span className="badge badge-info">{f.type}</span></td>
                  <td>{f.size}</td>
                  <td>{f.date}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline">View</button>
                      <button className="btn btn-xs btn-danger" onClick={()=>setUploaded(prev=>prev.filter((_,j)=>j!==i))}>Delete</button>
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
