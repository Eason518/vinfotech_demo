import { useState } from 'react';
import { events } from '../../data/marketMockData';

export default function Events() {
  const [activeTab, setActiveTab] = useState('Open Events');
  const tabs = ['Overdue (26)', 'Partial Due (0)', 'Open Events'];
  const overdueEvents = events.filter((e) => e.status === 'Overdue');
  const openEvents = events.filter((e) => e.status === 'Open');
  const displayEvents = activeTab === 'Overdue (26)' ? overdueEvents : activeTab === 'Partial Due (0)' ? [] : openEvents;

  const statusBadge = (s) => (
    <span className={`badge ${s === 'Open' ? 'badge-green' : s === 'Overdue' ? 'badge-red' : 'badge-orange'}`}>{s}</span>
  );

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">View / Resolve Events</div>
          <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Open Events: <strong>37</strong></div>
        </div>
        <button className="btn-orange">+ Add New Event</button>
      </div>
      <div className="market-card" style={{ padding: 16 }}>
        <div className="market-filters">
          <select className="market-select"><option>Select Market</option><option>Crypto</option><option>Tech</option><option>Sports</option></select>
          <select className="market-select"><option>Select Topic</option><option>IPO</option><option>BTC Price</option><option>Altcoin</option></select>
          <select className="market-select"><option>Select Source</option><option>Polymarket</option><option>Kalshi</option><option>Internal</option></select>
          <select className="market-select"><option>Select Operator</option><option>Admin</option><option>System</option></select>
          <select className="market-select"><option>Select Status</option><option>Open</option><option>Overdue</option><option>Partial Due</option></select>
        </div>
      </div>
      <div className="market-tabs">
        {tabs.map((t) => (
          <button key={t} className={`market-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>
      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>Event Name</th><th>Market</th><th>Topic</th><th>Source</th>
                <th>Operator</th><th>Volume</th><th>Expiry Date</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayEvents.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: 32, color: '#9ca3af' }}>No events found</td></tr>
              ) : displayEvents.map((ev) => (
                <tr key={ev.id}>
                  <td style={{ maxWidth: 240, fontWeight: 500 }}>{ev.name}</td>
                  <td><span className="badge badge-blue">{ev.market}</span></td>
                  <td>{ev.topic}</td>
                  <td>{ev.source}</td>
                  <td>{ev.operator}</td>
                  <td style={{ fontWeight: 600 }}>{ev.volume}</td>
                  <td>{ev.expiryDate}</td>
                  <td>{statusBadge(ev.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-icon btn-sm">Edit</button>
                      <button className="btn-icon btn-sm">Resolve</button>
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
