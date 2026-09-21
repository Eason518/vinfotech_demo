import { useState } from 'react';
import { markets } from '../../data/marketMockData';

export default function Markets() {
  const [data, setData] = useState(markets);

  const toggleActive = (id) => {
    setData((prev) => prev.map((m) => m.id === id ? { ...m, active: !m.active } : m));
  };

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">View / Edit Market</div>
          <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Open Events: <strong>5</strong></div>
        </div>
        <button className="btn-orange">+ Add New Market</button>
      </div>
      <div className="market-card" style={{ padding: 16 }}>
        <div className="market-filters">
          <select className="market-select">
            <option>Filter by Provider</option><option>Polymarket</option><option>Kalshi</option><option>Internal</option>
          </select>
        </div>
      </div>
      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>Name</th><th>ID #</th><th>Source</th><th>Topics</th><th>Open Events</th><th>Creation Date</th><th>Active</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: 12 }}>{m.id}</td>
                  <td><span className="badge badge-blue">{m.source}</span></td>
                  <td>{m.topics}</td>
                  <td>{m.openEvents}</td>
                  <td>{m.createdAt}</td>
                  <td>
                    <label className="toggle">
                      <input type="checkbox" checked={m.active} onChange={() => toggleActive(m.id)} />
                      <span className="toggle-slider"></span>
                    </label>
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
