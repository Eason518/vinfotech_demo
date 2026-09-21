import { useState } from 'react';

const ammEvents = [
  { id: 1, event: 'Rockies vs Brewers', league: 'Major League Baseball', topic: 'Match Result', startTime: 'Jul 23, 04:06 PM', endTime: 'Jul 25, 04:20 AM', budget: '$500.00', enabled: true },
  { id: 2, event: 'Tigers vs Cubs', league: 'Major League Baseball', topic: 'Match Result', startTime: 'Jul 20, 04:28 PM', endTime: 'Jul 21, 08:15 AM', budget: '$500.00', enabled: false },
  { id: 3, event: 'Cardinals vs Angels', league: 'Major League Baseball', topic: 'Match Result', startTime: 'Jul 22, 06:00 PM', endTime: 'Jul 23, 10:00 AM', budget: '$500.00', enabled: true },
  { id: 4, event: 'BTC Up or Down?', league: 'Crypto', topic: 'BTC Price', startTime: 'Jul 21, 12:00 PM', endTime: 'Jul 21, 06:00 PM', budget: '$200.00', enabled: true },
];

const subTabs = ['Add AMM', 'Configuration', 'Liquidity Management', 'Users', 'Dashboard', 'Revenue', 'Exposure', 'Risk Dashboard'];

export default function AMM() {
  const [activeSubTab, setActiveSubTab] = useState('Add AMM');
  const [data, setData] = useState(ammEvents);
  const [search, setSearch] = useState('');
  const [marketFilter, setMarketFilter] = useState('All Markets');

  const toggleEnabled = (id) => setData((prev) => prev.map((e) => e.id === id ? { ...e, enabled: !e.enabled } : e));

  const filtered = data.filter((e) => {
    const matchSearch = e.event.toLowerCase().includes(search.toLowerCase());
    const matchMarket = marketFilter === 'All Markets' || e.league === marketFilter;
    return matchSearch && matchMarket;
  });

  return (
    <div>
      <div className="market-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="market-page-title">AMM Management</div>
          <div style={{ width: 1, height: 28, background: '#e5e7eb' }}></div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Automated Market Maker</div>
        </div>
      </div>

      <div className="sub-tabs">
        {subTabs.map((t) => (
          <button key={t} className={`sub-tab ${activeSubTab === t ? 'active' : ''}`} onClick={() => setActiveSubTab(t)}>{t}</button>
        ))}
      </div>

      {activeSubTab === 'Add AMM' && (
        <div>
          <div className="info-box">
            <span>i</span>
            <span>Enable AMM trading on specific events and configure price limits for each outcome.</span>
          </div>

          <div className="market-card" style={{ padding: 16 }}>
            <div className="market-filters">
              <div style={{ flex: 1 }}>
                <input className="market-input" style={{ width: '100%', boxSizing: 'border-box' }} placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <select className="market-select" value={marketFilter} onChange={(e) => setMarketFilter(e.target.value)}>
                <option>All Markets</option><option>Crypto</option><option>Tech</option>
                <option>FIFA World Cup</option><option>Major League Baseball</option>
                <option>Economy</option><option>Culture</option><option>World</option><option>Bollywood</option><option>Top</option>
              </select>
              <select className="market-select">
                <option>All Topics</option><option>Match Result</option><option>BTC Price</option><option>Altcoin</option>
              </select>
            </div>
          </div>

          <div className="market-card" style={{ padding: 0 }}>
            <div className="market-table-wrap">
              <table className="market-table">
                <thead>
                  <tr>
                    <th>EVENTS</th><th>MARKET / LEAGUE</th><th>TOPIC / MATCH</th>
                    <th>START TIME</th><th>END TIME</th><th>TOTAL BUDGET AMOUNT</th><th>AMM ENABLED</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 600 }}>{row.event}</td>
                      <td><span className="badge badge-blue">{row.league}</span></td>
                      <td>{row.topic}</td>
                      <td style={{ fontSize: 12, color: '#6b7280' }}>{row.startTime}</td>
                      <td style={{ fontSize: 12, color: '#6b7280' }}>{row.endTime}</td>
                      <td style={{ fontWeight: 600 }}>{row.budget}</td>
                      <td>
                        <label className="toggle">
                          <input type="checkbox" checked={row.enabled} onChange={() => toggleEnabled(row.id)} />
                          <span className="toggle-slider"></span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSubTab !== 'Add AMM' && (
        <div className="market-card">
          <div style={{ textAlign: 'center', padding: 48, color: '#9ca3af' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>[ ]</div>
            <div style={{ fontSize: 14 }}>{activeSubTab} — coming soon</div>
          </div>
        </div>
      )}
    </div>
  );
}
