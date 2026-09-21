import { useState } from 'react';

export default function AppSetting() {
  const [minTrade, setMinTrade] = useState('1');
  const [maxTrade, setMaxTrade] = useState('10000');
  const [maxPositions, setMaxPositions] = useState('50');
  const [defaultOdds, setDefaultOdds] = useState('2.00');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="market-page-header">
        <div className="market-page-title">App Setting</div>
      </div>
      <div className="market-page-subtitle" style={{ marginBottom: 20, color: '#6b7280' }}>
        Configure global site settings and trading limits
      </div>

      <div className="market-card" style={{ maxWidth: 600 }}>
        <div className="market-section-label" style={{ marginBottom: 16 }}>TRADING LIMITS</div>

        <div className="market-form-group">
          <label className="market-form-label">Minimum Trade Amount ($)</label>
          <input type="number" className="market-form-input" value={minTrade} onChange={(e) => setMinTrade(e.target.value)} />
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Minimum trade is set to $1</div>
        </div>

        <div className="market-form-group">
          <label className="market-form-label">Maximum Trade Amount ($)</label>
          <input type="number" className="market-form-input" value={maxTrade} onChange={(e) => setMaxTrade(e.target.value)} />
        </div>

        <div className="market-form-group">
          <label className="market-form-label">Max Open Positions per User</label>
          <input type="number" className="market-form-input" value={maxPositions} onChange={(e) => setMaxPositions(e.target.value)} />
        </div>

        <div className="market-form-group">
          <label className="market-form-label">Default Odds Multiplier</label>
          <input type="number" step="0.01" className="market-form-input" value={defaultOdds} onChange={(e) => setDefaultOdds(e.target.value)} />
        </div>

        <div style={{ marginTop: 8 }}>
          <button className="btn-orange" onClick={handleSave}>
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
