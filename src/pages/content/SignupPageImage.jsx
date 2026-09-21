import { useState } from "react";
import Layout from "../../components/Layout";
import { toast } from "../../components/Toast";

export default function SignupPageImage() {
  const [preview, setPreview] = useState("/placeholder-cricket.jpg");
  const [file, setFile] = useState(null);
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };
  const save = () => { if(file) toast("Image saved successfully","success"); };
  const reset = () => { setFile(null); setPreview(null); };
  return (
    <Layout title="Signup Page Image">
      <div className="page-header">
        <p className="breadcrumb">Home / Content Management / <span>Signup Page Image</span></p>
        <h1>Signup Page Image</h1>
      </div>
      <div className="card" style={{maxWidth:"700px"}}>
        <div className="form-group">
          <label className="form-label">Select Image (600*1340) <span style={{color:"var(--danger)"}}>*</span></label>
          <input type="file" accept="image/*" onChange={handleFile} style={{display:"block",marginBottom:"16px"}}/>
        </div>
        {preview ? (
          <div style={{marginBottom:"20px"}}>
            <img src={preview} alt="Preview" style={{width:"140px",borderRadius:"8px",border:"1px solid var(--border)",objectFit:"cover"}} onError={e=>{e.target.style.display="none"}}/>
          </div>
        ) : (
          <div style={{width:"140px",height:"200px",background:"var(--bg)",borderRadius:"8px",border:"2px dashed var(--border)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20px",color:"var(--text-muted)",fontSize:"13px"}}>
            No image
          </div>
        )}
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm" onClick={save}>Save</button>
          <button className="btn btn-danger btn-sm" onClick={reset}>Reset</button>
        </div>
      </div>
    </Layout>
  );
}
