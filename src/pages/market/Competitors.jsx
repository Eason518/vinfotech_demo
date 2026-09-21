import { useState } from 'react';
import { competitors } from '../../data/marketMockData';

export default function Competitors() {
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = typeFilter === 'All' ? competitors : competitors.filter((c) => c.type === typeFilter);

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">Competitors</div>
          <div className="market-page-subtitle">Manage teams, players, candidates, or parties that participate in fixtures.</div>
        </div>
        <button className="btn-orange">+ Add Competitor</button>
      </div>
      <div className="market-card" style={{ padding: 16 }}>
        <div className="market-filters">
          <select className="market-select">
            <option>Sub Category</option><option>Football</option><option>Cricket</option><option>Baseball</option>
          </select>
          <select className="market-select">
            <option>League</option><option>MLB</option><option>IPL</option><option>FIFA WC</option><option>NFL</option>
          </select>
          <div style={{ display: 'flex', gap: 4 }}>
            {['All', 'Team', 'Player'].map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)}
                style={{ padding: '6px 12px', border: '1px solid', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  borderColor: typeFilter === t ? '#FF6B35' : '#d1d5db',
                  background: typeFilter === t ? '#FF6B35' : '#fff',
                  color: typeFilter === t ? '#fff' : '#374151' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>LOGO</th><th>NAME</th><th>SHORT NAME</th><th>TYPE</th><th>LEAGUE</th><th>STATUS</th><th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ width: 36, height: 36, background: '#1a1f2e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#fff' }}>
                      {c.logo}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td><span className="badge badge-gray">{c.shortName}</span></td>
                  <td>
                    <span className={`badge ${c.type === 'Team' ? 'badge-blue' : 'badge-orange'}`}>{c.type}</span>
                  </td>
                  <td>{c.league}</td>
                  <td>
                    <span className={`badge ${c.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{c.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-icon btn-sm">Edit</button>
                      <button className="btn-icon btn-sm">Del</button>
                    </div>
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
