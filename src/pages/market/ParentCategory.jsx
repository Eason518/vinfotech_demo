import { useState } from 'react';
import { parentCategories } from '../../data/marketMockData';

export default function ParentCategory() {
  const [data] = useState(parentCategories);

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">Parent Category</div>
          <div className="market-page-subtitle">Manage top-level parent categories, like Elections or Reality Shows.</div>
        </div>
        <button className="btn-orange">+ Add Category</button>
      </div>
      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr><th>NAME</th><th>DESCRIPTION</th><th>SUB CATEGORIES</th><th>STATUS</th><th>ACTIONS</th></tr>
            </thead>
            <tbody>
              {data.map((cat) => (
                <tr key={cat.id}>
                  <td style={{ fontWeight: 600 }}>{cat.name}</td>
                  <td style={{ color: '#6b7280' }}>{cat.description}</td>
                  <td>{cat.subCategories}</td>
                  <td>
                    <span className={`badge ${cat.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{cat.status}</span>
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
