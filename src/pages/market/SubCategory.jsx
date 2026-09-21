import { useState } from 'react';
import { subCategories } from '../../data/marketMockData';

export default function SubCategory() {
  const [data, setData] = useState(subCategories);

  const togglePopular = (id) => setData((prev) => prev.map((s) => s.id === id ? { ...s, popular: !s.popular } : s));

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">Sub Category</div>
          <div className="market-page-subtitle">Manage sports or top-level categories that belong to parent categories.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-outline">Reorder Sub Categories</button>
          <button className="btn-orange">+ Add Sub Category</button>
        </div>
      </div>
      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>ICON</th><th>NAME</th><th>PARENT CATEGORY</th><th>DESCRIPTION</th>
                <th>LEAGUES</th><th>POPULAR</th><th>STATUS</th><th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ width: 32, height: 32, background: '#f3f4f6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#6b7280' }}>
                      {s.icon}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>{s.parentCategory}</td>
                  <td style={{ color: '#6b7280', maxWidth: 200 }}>{s.description}</td>
                  <td>{s.leagues}</td>
                  <td>
                    <label className="toggle">
                      <input type="checkbox" checked={s.popular} onChange={() => togglePopular(s.id)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <span className={`badge ${s.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{s.status}</span>
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
