import { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { toast } from '../../components/Toast';

const assetDefs = [
  { key: 'userLight', name: 'Userend Light', size: '320×80 px png', preview: '🌅' },
  { key: 'userDark', name: 'Userend Dark', size: '320×80 px png', preview: null },
  { key: 'email', name: 'Email', size: '30×30 px png', preview: '✉️' },
  { key: 'admin', name: 'Admin', size: '200×50 px png', preview: '🛡️' },
];

export default function AssetsUpload() {
  const [previews, setPreviews] = useState({});
  const fileRefs = useRef({});

  const handleFile = (key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviews(p => ({ ...p, [key]: url }));
  };

  const handleUpdate = () => {
    toast('Assets updated', 'success');
  };

  return (
    <Layout title="Assets Upload">
      <div className="page-header">
        <p className="breadcrumb">Home / Settings / <span>Assets Upload</span></p>
        <h1>Assets Upload</h1>
      </div>
      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image Preview</th>
                <th>Upload New</th>
              </tr>
            </thead>
            <tbody>
              {assetDefs.map(asset => (
                <tr key={asset.key}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{asset.name}</div>
                    <div style={{ fontSize: '12px', color: '#e05555', marginTop: '2px' }}>{asset.size}</div>
                  </td>
                  <td>
                    {previews[asset.key] ? (
                      <img src={previews[asset.key]} alt={asset.name} style={{ maxHeight: '50px', maxWidth: '160px', objectFit: 'contain', borderRadius: '4px', border: '1px solid var(--border)' }} />
                    ) : asset.preview ? (
                      <div style={{ fontSize: '32px', display: 'inline-block' }}>{asset.preview}</div>
                    ) : (
                      <div style={{ width: '100px', height: '36px', background: '#f0f2f4', borderRadius: '4px', border: '1px dashed var(--border)' }}></div>
                    )}
                  </td>
                  <td>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={el => fileRefs.current[asset.key] = el}
                      onChange={e => handleFile(asset.key, e)}
                    />
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ borderRadius: '20px', padding: '6px 18px' }}
                      onClick={() => fileRefs.current[asset.key]?.click()}
                    >
                      Upload
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button
            className="btn btn-sm"
            style={{ background: '#6c757d', color: '#fff', borderRadius: '6px', padding: '8px 24px' }}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </Layout>
  );
}
