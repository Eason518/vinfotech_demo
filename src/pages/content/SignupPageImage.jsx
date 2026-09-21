import { useState } from 'react';
import Layout from '../../components/Layout';

export default function SignupPageImage() {
  const [images, setImages] = useState([
    { id:1, name:'Slide 1 - Welcome', active:true },
    { id:2, name:'Slide 2 - IPL Special', active:true },
    { id:3, name:'Slide 3 - Fantasy Sports', active:false },
  ]);
  const toggle = (id) => setImages(i => i.map(x => x.id===id ? {...x,active:!x.active} : x));
  return (
    <Layout title="Signup Page Image">
      <div className="page-header"><p className="breadcrumb">Home / Content / <span>Signup Page Image</span></p><h1>Signup Page Images</h1></div>
      <div className="card">
        <div className="alert alert-info mb-4">These images appear as rotating slides on the login/signup page left panel.</div>
        <div className="flex justify-between items-center mb-4">
          <span style={{color:'var(--text-muted)',fontSize:'13px'}}>{images.filter(i=>i.active).length} active slides</span>
          <button className="btn btn-primary btn-sm">+ Upload New Image</button>
        </div>
        <div className="grid-3">
          {images.map(img => (
            <div key={img.id} className="card" style={{padding:'0', overflow:'hidden', border: img.active?'2px solid var(--primary)':'2px solid var(--border)'}}>
              <div style={{height:'180px',background:'linear-gradient(135deg,#1a2035,#3a7bd5)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'40px'}}>
                {img.id===1?'🏏':img.id===2?'🏆':'⚡'}
              </div>
              <div style={{padding:'14px'}}>
                <div style={{fontWeight:600,marginBottom:'8px',fontSize:'13px'}}>{img.name}</div>
                <div className="flex justify-between items-center">
                  <label className="toggle"><input type="checkbox" checked={img.active} onChange={()=>toggle(img.id)} /><span className="toggle-slider"></span></label>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-outline">Replace</button>
                    <button className="btn btn-xs btn-danger">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
