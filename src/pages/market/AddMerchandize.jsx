import { useState } from 'react';

export default function AddMerchandize() {
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', tournament: '', imageUrl: '' });
  const handle = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div>
      <div className="market-page-header">
        <div className="market-page-title">Add Merchandize</div>
      </div>
      <div className="market-card" style={{ maxWidth: 600 }}>
        <div className="market-form-group">
          <label className="market-form-label">Select Tournament</label>
          <select className="market-form-select" value={form.tournament} onChange={(e) => handle('tournament', e.target.value)}>
            <option value="">-- Select Tournament --</option>
            <option>Crypto Masters Q3 2026</option>
            <option>Sports Prediction Cup</option>
          </select>
        </div>
        <div className="market-form-group">
          <label className="market-form-label">Merchandise Name</label>
          <input className="market-form-input" placeholder="e.g. MarketAdmin Cap" value={form.name} onChange={(e) => handle('name', e.target.value)} />
        </div>
        <div className="market-form-group">
          <label className="market-form-label">Description</label>
          <textarea className="market-form-textarea" placeholder="Describe the merchandise..." value={form.description} onChange={(e) => handle('description', e.target.value)} />
        </div>
        <div className="market-cards-grid market-cards-grid-2">
          <div className="market-form-group">
            <label className="market-form-label">Price ($)</label>
            <input type="number" className="market-form-input" placeholder="e.g. 25.00" value={form.price} onChange={(e) => handle('price', e.target.value)} />
          </div>
          <div className="market-form-group">
            <label className="market-form-label">Stock Quantity</label>
            <input type="number" className="market-form-input" placeholder="e.g. 100" value={form.stock} onChange={(e) => handle('stock', e.target.value)} />
          </div>
        </div>
        <div className="market-form-group">
          <label className="market-form-label">Product Image</label>
          <div className="upload-area" onClick={() => {}}>
            <div className="upload-area-icon">[ IMG ]</div>
            <div className="upload-area-text">Click to upload product image</div>
            <div className="upload-area-specs">PNG/JPG/WEBP, max 5MB</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-orange">Add Merchandise</button>
          <button className="btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  );
}
