import { useState } from 'react';

export default function TournamentList() {
  const [activeTab, setActiveTab] = useState('OPEN');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div>
      <div className="market-page-header">
        <div className="market-page-title">Tournament List</div>
        <button className="btn-outline">EXPORT</button>
      </div>
      <div className="market-tabs">
        {['OPEN', 'CLOSED'].map((t) => (
          <button key={t} className={`market-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>
      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>Tournament Name</th><th>Market</th><th>Start Date</th>
                <th>End Date</th><th>Entry Fee</th><th>Participants</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 48, color: '#9ca3af' }}>
                  No records to display
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280' }}>
            <span>Rows per page:</span>
            <select className="market-select" style={{ width: 'auto', padding: '4px 8px' }} value={rowsPerPage} onChange={(e) => setRowsPerPage(+e.target.value)}>
              <option>5</option><option>10</option><option>25</option><option>50</option>
            </select>
          </div>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>0 records</span>
        </div>
      </div>
    </div>
  );
}
