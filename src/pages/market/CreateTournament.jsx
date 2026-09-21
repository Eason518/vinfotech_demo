import { useState } from 'react';

export default function CreateTournament() {
  const [form, setForm] = useState({
    language: 'en',
    title: '',
    description: '',
    market: '',
    startingBalance: '',
    entryFee: '',
    requiredTrades: '',
    fromDate: '',
    toDate: '',
  });

  const handle = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div>
      <div className="market-page-header">
        <div className="market-page-title">Create Tournament</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span className="badge badge-blue">Multi-language</span>
        </div>
      </div>
      <div className="market-card" style={{ maxWidth: 720 }}>
        <div className="market-form-group">
          <label className="market-form-label">Language</label>
          <select className="market-form-select" value={form.language} onChange={(e) => handle('language', e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
        <div className="market-form-group">
          <label className="market-form-label">Tournament Title</label>
          <input className="market-form-input" placeholder="Enter tournament title" value={form.title} onChange={(e) => handle('title', e.target.value)} />
        </div>
        <div className="market-form-group">
          <label className="market-form-label">Short Description <span style={{ color: '#9ca3af', fontWeight: 400 }}>(max 200 characters)</span></label>
          <textarea className="market-form-textarea" maxLength={200} placeholder="Describe the tournament..." value={form.description} onChange={(e) => handle('description', e.target.value)} />
          <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'right', marginTop: 4 }}>{form.description.length}/200</div>
        </div>
        <div className="market-form-group">
          <label className="market-form-label">Select Market</label>
          <select className="market-form-select" value={form.market} onChange={(e) => handle('market', e.target.value)}>
            <option value="">-- Select Market --</option>
            <option>Crypto</option><option>Tech</option><option>Sports</option><option>Politics</option><option>Finance</option>
          </select>
        </div>
        <div className="market-cards-grid market-cards-grid-2">
          <div className="market-form-group">
            <label className="market-form-label">Starting Balance ($)</label>
            <input type="number" className="market-form-input" placeholder="e.g. 1000" value={form.startingBalance} onChange={(e) => handle('startingBalance', e.target.value)} />
          </div>
          <div className="market-form-group">
            <label className="market-form-label">Entry Fee ($)</label>
            <input type="number" className="market-form-input" placeholder="e.g. 10" value={form.entryFee} onChange={(e) => handle('entryFee', e.target.value)} />
          </div>
        </div>
        <div className="market-form-group">
          <label className="market-form-label">Required Trades / Token to Join</label>
          <input type="number" className="market-form-input" placeholder="e.g. 5" value={form.requiredTrades} onChange={(e) => handle('requiredTrades', e.target.value)} />
        </div>
        <div className="market-cards-grid market-cards-grid-2">
          <div className="market-form-group">
            <label className="market-form-label">From Date</label>
            <input type="datetime-local" className="market-form-input" value={form.fromDate} onChange={(e) => handle('fromDate', e.target.value)} />
          </div>
          <div className="market-form-group">
            <label className="market-form-label">To Date</label>
            <input type="datetime-local" className="market-form-input" value={form.toDate} onChange={(e) => handle('toDate', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn-orange">Create Tournament</button>
          <button className="btn-outline">Reset</button>
        </div>
      </div>
    </div>
  );
}
