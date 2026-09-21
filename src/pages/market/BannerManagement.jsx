import { useState } from 'react';

export default function BannerManagement() {
  const [form, setForm] = useState({
    language: 'en',
    title: '',
    buttonText: '',
    hexColor: '#FF6B35',
    description: '',
  });
  const [sidePreview, setSidePreview] = useState(null);
  const [fullPreview, setFullPreview] = useState(null);

  const handle = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) setter(URL.createObjectURL(file));
  };

  return (
    <div>
      <div className="market-page-header">
        <div className="market-page-title">Banner Management</div>
        <button className="btn-orange">+ Create New Banner</button>
      </div>

      <div className="market-card" style={{ maxWidth: 800 }}>
        <div className="market-section-label" style={{ marginBottom: 16 }}>CREATE NEW BANNER</div>

        <div className="market-form-group">
          <label className="market-form-label">Language</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <select className="market-form-select" style={{ maxWidth: 200 }} value={form.language} onChange={(e) => handle('language', e.target.value)}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="hi">Hindi</option>
            </select>
            <button className="btn-outline btn-sm">Translate All</button>
          </div>
        </div>

        <div className="market-form-group">
          <label className="market-form-label">Title</label>
          <input className="market-form-input" placeholder="Banner title" value={form.title} onChange={(e) => handle('title', e.target.value)} />
        </div>

        <div className="market-form-group">
          <label className="market-form-label">Button Text</label>
          <input className="market-form-input" placeholder="e.g. Trade Now" value={form.buttonText} onChange={(e) => handle('buttonText', e.target.value)} />
        </div>

        <div className="market-form-group">
          <label className="market-form-label">Hex Color</label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input type="color" value={form.hexColor} onChange={(e) => handle('hexColor', e.target.value)} style={{ width: 48, height: 38, border: '1px solid #d1d5db', borderRadius: 6, padding: 2, cursor: 'pointer' }} />
            <input className="market-form-input" style={{ maxWidth: 140 }} value={form.hexColor} onChange={(e) => handle('hexColor', e.target.value)} placeholder="#FF6B35" />
            <div style={{ width: 36, height: 36, borderRadius: 6, background: form.hexColor, border: '1px solid #e5e7eb' }} />
          </div>
        </div>

        <div className="market-form-group">
          <label className="market-form-label">Description</label>
          <textarea className="market-form-textarea" placeholder="Banner description..." value={form.description} onChange={(e) => handle('description', e.target.value)} />
        </div>

        <div className="market-cards-grid market-cards-grid-2">
          <div className="market-form-group">
            <label className="market-form-label">Upload Side Image <span style={{ color: '#9ca3af', fontWeight: 400 }}>(500x500)</span></label>
            <div className="upload-area" onClick={() => document.getElementById('side-img').click()}>
              {sidePreview ? (
                <img src={sidePreview} alt="side" style={{ maxHeight: 100, maxWidth: '100%', objectFit: 'contain' }} />
              ) : (
                <>
                  <div className="upload-area-icon" style={{ fontSize: 20, color: '#9ca3af' }}>[500x500]</div>
                  <div className="upload-area-text">Click to upload side image</div>
                  <div className="upload-area-specs">PNG/JPG/WEBP, max 2MB</div>
                </>
              )}
              <input id="side-img" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange(setSidePreview)} />
            </div>
          </div>

          <div className="market-form-group">
            <label className="market-form-label">Upload Full Image <span style={{ color: '#9ca3af', fontWeight: 400 }}>(635x300)</span></label>
            <div className="upload-area" onClick={() => document.getElementById('full-img').click()}>
              {fullPreview ? (
                <img src={fullPreview} alt="full" style={{ maxHeight: 100, maxWidth: '100%', objectFit: 'contain' }} />
              ) : (
                <>
                  <div className="upload-area-icon" style={{ fontSize: 20, color: '#9ca3af' }}>[635x300]</div>
                  <div className="upload-area-text">Click to upload full image</div>
                  <div className="upload-area-specs">PNG/JPG/WEBP, max 2MB</div>
                </>
              )}
              <input id="full-img" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange(setFullPreview)} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn-orange">Save Banner</button>
          <button className="btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  );
}
