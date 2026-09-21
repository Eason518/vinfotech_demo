import { useState } from 'react';
import { topics } from '../../data/marketMockData';

export default function Topics() {
  const [data, setData] = useState(topics);

  const toggleActive = (id) => {
    setData((prev) => prev.map((t) => t.id === id ? { ...t, active: !t.active } : t));
  };

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">View / Edit Topic</div>
          <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Open Events: <strong>5</strong></div>
        </div>
        <button className="btn-orange">+ Add New Topic</button>
      </div>
      <div className="market-card" style={{ padding: 16 }}>
        <div className="market-filters">
          <select className="market-select">
            <option>Select Market</option><option>Crypto</option><option>Tech</option><option>Sports</option>
          </select>
        </div>
      </div>
      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>Name</th><th>ID #</th><th>Open Events</th><th>Creation Date</th><th>Active</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{t.name}</td>
                  <td style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: 12 }}>{t.id}</td>
                  <td>{t.openEvents}</td>
                  <td>{t.createdAt}</td>
                  <td>
                    <label className="toggle">
                      <input type="checkbox" checked={t.active} onChange={() => toggleActive(t.id)} />
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
