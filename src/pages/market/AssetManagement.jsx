import { useState } from 'react';

function UploadBox({ label, specs }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="market-form-group">
      <label className="market-form-label">{label}</label>
      <div className="upload-area" style={{ position: 'relative' }} onClick={() => document.getElementById('upload-' + label.replace(/\s/g,'-')).click()}>
        {preview ? (
          <img src={preview} alt="preview" style={{ maxHeight: 80, maxWidth: '100%', objectFit: 'contain' }} />
        ) : (
          <>
            <div className="upload-area-icon" style={{ fontSize: 24, color: '#9ca3af' }}>[IMG]</div>
            <div className="upload-area-text">Click to upload or drag and drop</div>
            <div className="upload-area-specs">{specs}</div>
          </>
        )}
        <input id={"upload-" + label.replace(/\s/g,'-')} type="file" accept="image/jpg,image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleChange} />
      </div>
      {preview && (
        <button className="btn-outline btn-sm" style={{ marginTop: 8 }} onClick={() => setPreview(null)}>Remove</button>
      )}
    </div>
  );
}

export default function AssetManagement() {
  return (
    <div>
      <div className="market-page-header">
        <div className="market-page-title">Asset Management</div>
      </div>
      <div className="market-cards-grid market-cards-grid-2">
        <div className="market-card">
          <div className="market-section-label" style={{ marginBottom: 16 }}>LOGO (DARK THEME)</div>
          <UploadBox
            label="Logo Dark Theme"
            specs="Size: 128x40px to 256x80px | Max 2MB | JPG / PNG / JPEG / WEBP"
          />
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
            Recommended: 256x80px | Max 2MB | JPG/PNG/JPEG/WEBP
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn-orange btn-sm">Upload Logo</button>
          </div>
        </div>

        <div className="market-card">
          <div className="market-section-label" style={{ marginBottom: 16 }}>LOGO (LIGHT THEME)</div>
          <UploadBox
            label="Logo Light Theme"
            specs="Size: 128x40px to 256x80px | Max 2MB | JPG / PNG / JPEG / WEBP"
          />
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
            Recommended: 256x80px | Max 2MB | JPG/PNG/JPEG/WEBP
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn-orange btn-sm">Upload Logo</button>
          </div>
        </div>
      </div>

      <div className="market-card">
        <div className="market-section-label" style={{ marginBottom: 16 }}>FAVICON</div>
        <UploadBox
          label="Favicon"
          specs="Size: 32x32px | Max 1MB | PNG/ICO"
        />
      </div>
    </div>
  );
}
