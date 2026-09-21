import { useState } from 'react';
import { leagues } from '../../data/marketMockData';

export default function Leagues() {
  const [yearFilter, setYearFilter] = useState('All');
  const years = ['All', '2024', '2025', '2026', '2027'];

  const filtered = yearFilter === 'All' ? leagues : leagues.filter((l) => l.year === +yearFilter);

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">League / Competitions</div>
          <div className="market-page-subtitle">Manage leagues, tournaments, or seasons that belong to sub categories.</div>
        </div>
        <button className="btn-orange">+ Add League</button>
      </div>
      <div className="market-card" style={{ padding: 16 }}>
        <div className="market-filters">
          <select className="market-select">
            <option>Filter by Sub Category</option><option>Football</option><option>Cricket</option><option>Baseball</option><option>Tennis</option>
          </select>
          <div style={{ display: 'flex', gap: 4 }}>
            {years.map((y) => (
              <button key={y} onClick={() => setYearFilter(y)}
                style={{ padding: '6px 12px', border: '1px solid', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  borderColor: yearFilter === y ? '#FF6B35' : '#d1d5db',
                  background: yearFilter === y ? '#FF6B35' : '#fff',
                  color: yearFilter === y ? '#fff' : '#374151' }}>
                {y}
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
                <th>LOGO</th><th>LEAGUE NAME</th><th>ABBREVIATION</th><th>SUB CATEGORY</th>
                <th>YEAR</th><th>FIXTURES</th><th>STATUS</th><th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td>
                    <div style={{ width: 40, height: 28, background: '#1a1f2e', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>
                      {l.logo}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{l.name}</td>
                  <td><span className="badge badge-blue">{l.abbr}</span></td>
                  <td>{l.subCategory}</td>
                  <td>{l.year}</td>
                  <td>{l.fixtures}</td>
                  <td>
                    <span className={`badge ${l.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{l.status}</span>
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
