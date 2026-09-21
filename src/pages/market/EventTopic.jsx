import { useState } from 'react';
import { events, topics } from '../../data/marketMockData';

export default function EventTopic() {
  const [activeTab, setActiveTab] = useState('Events');

  return (
    <div>
      <div className="market-page-header">
        <div className="market-page-title">Sports Event / Topic</div>
      </div>
      <div className="market-tabs">
        {['Events', 'Topics'].map((t) => (
          <button key={t} className={`market-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>
      {activeTab === 'Events' ? (
        <div className="market-card" style={{ padding: 0 }}>
          <div className="market-table-wrap">
            <table className="market-table">
              <thead>
                <tr><th>Event Name</th><th>Market</th><th>Topic</th><th>Volume</th><th>Expiry Date</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {events.filter((e) => e.market === 'Sports').map((ev) => (
                  <tr key={ev.id}>
                    <td style={{ fontWeight: 500 }}>{ev.name}</td>
                    <td><span className="badge badge-blue">{ev.market}</span></td>
                    <td>{ev.topic}</td>
                    <td style={{ fontWeight: 600 }}>{ev.volume}</td>
                    <td>{ev.expiryDate}</td>
                    <td><span className={`badge ${ev.status === 'Open' ? 'badge-green' : 'badge-red'}`}>{ev.status}</span></td>
                    <td><button className="btn-icon btn-sm">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="market-card" style={{ padding: 0 }}>
          <div className="market-table-wrap">
            <table className="market-table">
              <thead>
                <tr><th>Name</th><th>ID #</th><th>Open Events</th><th>Creation Date</th><th>Active</th></tr>
              </thead>
              <tbody>
                {topics.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 600 }}>{t.name}</td>
                    <td style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: 12 }}>{t.id}</td>
                    <td>{t.openEvents}</td>
                    <td>{t.createdAt}</td>
                    <td>
                      <span className={`badge ${t.active ? 'badge-green' : 'badge-gray'}`}>{t.active ? 'Active' : 'Inactive'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
