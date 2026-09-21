import { useState } from 'react';
import { spotlightEvents } from '../../data/marketMockData';

export default function Spotlight() {
  const [activeTab, setActiveTab] = useState('SPOTLIGHT EVENT');
  const [volumeFilter, setVolumeFilter] = useState(40);
  const [data, setData] = useState(spotlightEvents);

  const toggleSP = (sno) => setData((prev) => prev.map((e) => e.sno === sno ? { ...e, sp: !e.sp } : e));
  const toggleSpotlightMarket = (sno) => setData((prev) => prev.map((e) => e.sno === sno ? { ...e, spotlightMarketOnly: !e.spotlightMarketOnly } : e));

  return (
    <div>
      <div className="market-page-header">
        <div className="market-page-title">Spotlight</div>
      </div>
      <div className="market-tabs">
        {['SPOTLIGHT EVENT', 'MARKED EVENTS (1)'].map((t) => (
          <button key={t} className={`market-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>
      <div className="market-card" style={{ padding: 16 }}>
        <div className="market-filters" style={{ alignItems: 'flex-end' }}>
          <select className="market-select"><option>Select Market</option><option>Crypto</option><option>Tech</option><option>Sports</option></select>
          <select className="market-select"><option>Select Topic</option><option>IPO</option><option>BTC Price</option><option>Altcoin</option></select>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#6b7280' }}>Search by Volume: {volumeFilter}</label>
            <input type="range" min={0} max={40} value={volumeFilter} onChange={(e) => setVolumeFilter(+e.target.value)} style={{ accentColor: '#FF6B35', width: 160 }} />
          </div>
          <button className="btn-orange">Apply</button>
        </div>
      </div>
      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>S.NO</th><th>Event Name</th><th>Volume</th><th>Market</th><th>Topic</th>
                <th>Expiry Date</th><th>Spotlight in Market Only</th><th>SP</th>
              </tr>
            </thead>
            <tbody>
              {data.filter((e) => e.volume <= volumeFilter).map((ev) => (
                <tr key={ev.sno}>
                  <td>{ev.sno}</td>
                  <td style={{ fontWeight: 500 }}>{ev.name}</td>
                  <td>{ev.volume}</td>
                  <td><span className="badge badge-blue">{ev.market}</span></td>
                  <td>{ev.topic}</td>
                  <td>{ev.expiryDate}</td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={ev.spotlightMarketOnly} onChange={() => toggleSpotlightMarket(ev.sno)} style={{ accentColor: '#FF6B35', width: 16, height: 16 }} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={ev.sp} onChange={() => toggleSP(ev.sno)} style={{ accentColor: '#FF6B35', width: 16, height: 16 }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
