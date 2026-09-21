import { useState } from 'react';
import { plReport } from '../../data/marketMockData';

const masterStats = [
  { label: 'TOTAL USER VOL', value: plReport.totalUserVol, color: '#1a1f2e' },
  { label: 'FEES COLLECTED', value: plReport.feesCollected, color: '#FF6B35' },
  { label: 'NET PLATFORM PROFIT', value: plReport.netPlatformProfit, color: '#10b981' },
  { label: 'TOTAL MARKET CREATED', value: plReport.totalMarketCreated, color: '#1a1f2e' },
];

const revenueStream = [
  { source: 'Trading Fees', amount: '$8,420', pct: '59%' },
  { source: 'Spread Revenue', amount: '$3,240', pct: '23%' },
  { source: 'Rake', amount: '$1,850', pct: '13%' },
  { source: 'Other', amount: '$706', pct: '5%' },
];

const marketReport = [
  { market: 'Crypto', events: 12, volume: '$124,500', fees: '$6,225', profit: '$4,100' },
  { market: 'Tech', events: 7, volume: '$87,200', fees: '$4,360', profit: '$2,890' },
  { market: 'Sports', events: 18, volume: '$72,620', fees: '$3,631', profit: '$1,930' },
];

const userMetrics = [
  { metric: 'Total Registered Users', value: '1,247' },
  { metric: 'Active Traders (30d)', value: '891' },
  { metric: 'Avg Trades per User', value: '14.2' },
  { metric: 'Avg Trade Value', value: '$124.50' },
  { metric: 'Top Spender', value: '$3,450' },
];

export default function PLReport() {
  const [sideTab, setSideTab] = useState('Net Profit/Loss Report');
  const [masterFilter, setMasterFilter] = useState('DAILY');
  const [masterSubTab, setMasterSubTab] = useState('OVERVIEW');
  const [favoriteTab, setFavoriteTab] = useState('All');

  const sideItems = ['Net Profit/Loss Report', 'Most Profitable Markets by Rake Collected'];

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {/* Sidebar */}
      <div style={{ minWidth: 220 }}>
        <div className="market-card" style={{ padding: 0 }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['All', 'Favorite (0)'].map((t) => (
                <button key={t} onClick={() => setFavoriteTab(t)}
                  style={{ flex: 1, padding: '5px 8px', border: '1px solid', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    borderColor: favoriteTab === t ? '#FF6B35' : '#d1d5db',
                    background: favoriteTab === t ? '#FF6B35' : '#fff',
                    color: favoriteTab === t ? '#fff' : '#374151' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          {sideItems.map((item) => (
            <button key={item} onClick={() => setSideTab(item)}
              style={{ width: '100%', textAlign: 'left', padding: '12px 16px', border: 'none', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', fontSize: 13, fontWeight: sideTab === item ? 700 : 400,
                background: sideTab === item ? '#fff8f5' : '#fff', color: sideTab === item ? '#FF6B35' : '#374151',
                borderLeft: sideTab === item ? '3px solid #FF6B35' : '3px solid transparent' }}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {sideTab === 'Net Profit/Loss Report' && (
          <div>
            <div className="market-card">
              <div className="market-section-label" style={{ marginBottom: 16 }}>NET P&L REPORT</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div className="market-form-group" style={{ margin: 0 }}>
                  <label className="market-form-label">From Date</label>
                  <input type="date" className="market-form-input" defaultValue="2026-07-01" />
                </div>
                <div className="market-form-group" style={{ margin: 0 }}>
                  <label className="market-form-label">To Date</label>
                  <input type="date" className="market-form-input" defaultValue="2026-07-21" />
                </div>
                <div className="market-form-group" style={{ margin: 0, minWidth: 160 }}>
                  <label className="market-form-label">Market</label>
                  <select className="market-form-select">
                    <option>All Markets</option><option>Crypto</option><option>Tech</option><option>Sports</option>
                  </select>
                </div>
                <button className="btn-orange" style={{ height: 38, alignSelf: 'flex-end' }}>PREVIEW</button>
              </div>
            </div>

            {/* Master P&L */}
            <div className="market-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="market-section-label">MASTER P&L</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'].map((f) => (
                    <button key={f} onClick={() => setMasterFilter(f)}
                      style={{ padding: '5px 12px', border: '1px solid', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontWeight: 700,
                        borderColor: masterFilter === f ? '#FF6B35' : '#d1d5db',
                        background: masterFilter === f ? '#FF6B35' : '#fff',
                        color: masterFilter === f ? '#fff' : '#374151' }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="market-cards-grid market-cards-grid-4">
                {masterStats.map((s) => (
                  <div key={s.label} className="stat-card">
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase' }}>{s.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub Tabs */}
            <div className="market-card">
              <div className="sub-tabs" style={{ marginBottom: 20 }}>
                {['OVERVIEW', 'REVENUE STREAM', 'MARKET REPORT', 'USER METRICS'].map((t) => (
                  <button key={t} className={`sub-tab ${masterSubTab === t ? 'active' : ''}`} onClick={() => setMasterSubTab(t)}>{t}</button>
                ))}
              </div>

              {masterSubTab === 'OVERVIEW' && (
                <div style={{ color: '#6b7280', fontSize: 13 }}>Select a date range above and click PREVIEW to see the overview.</div>
              )}

              {masterSubTab === 'REVENUE STREAM' && (
                <div>
                  <div className="market-section-label" style={{ marginBottom: 12 }}>REVENUE STREAM</div>
                  <div className="market-table-wrap">
                    <table className="market-table">
                      <thead>
                        <tr><th>Revenue Source</th><th>Amount</th><th>% of Total</th></tr>
                      </thead>
                      <tbody>
                        {revenueStream.map((r) => (
                          <tr key={r.source}>
                            <td style={{ fontWeight: 600 }}>{r.source}</td>
                            <td style={{ fontWeight: 600, color: '#10b981' }}>{r.amount}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 3 }}>
                                  <div style={{ width: r.pct, height: 6, background: '#FF6B35', borderRadius: 3 }} />
                                </div>
                                <span style={{ minWidth: 30 }}>{r.pct}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {masterSubTab === 'MARKET REPORT' && (
                <div>
                  <div className="market-section-label" style={{ marginBottom: 12 }}>MARKET REPORT</div>
                  <div className="market-table-wrap">
                    <table className="market-table">
                      <thead>
                        <tr><th>Market</th><th>Events</th><th>Volume</th><th>Fees</th><th>Profit</th></tr>
                      </thead>
                      <tbody>
                        {marketReport.map((r) => (
                          <tr key={r.market}>
                            <td style={{ fontWeight: 600 }}>{r.market}</td>
                            <td>{r.events}</td>
                            <td style={{ fontWeight: 600 }}>{r.volume}</td>
                            <td style={{ color: '#FF6B35', fontWeight: 600 }}>{r.fees}</td>
                            <td style={{ color: '#10b981', fontWeight: 600 }}>{r.profit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {masterSubTab === 'USER METRICS' && (
                <div>
                  <div className="market-section-label" style={{ marginBottom: 12 }}>USER METRICS</div>
                  <div className="market-table-wrap">
                    <table className="market-table">
                      <thead>
                        <tr><th>Metric</th><th>Value</th></tr>
                      </thead>
                      <tbody>
                        {userMetrics.map((m) => (
                          <tr key={m.metric}>
                            <td style={{ color: '#6b7280' }}>{m.metric}</td>
                            <td style={{ fontWeight: 700, fontSize: 15 }}>{m.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {sideTab === 'Most Profitable Markets by Rake Collected' && (
          <div className="market-card">
            <div className="market-section-label" style={{ marginBottom: 16 }}>MOST PROFITABLE MARKETS BY RAKE COLLECTED</div>
            <div className="market-table-wrap">
              <table className="market-table">
                <thead>
                  <tr><th>Rank</th><th>Market</th><th>Rake Collected</th><th>Total Volume</th><th>Rake %</th></tr>
                </thead>
                <tbody>
                  {[{ rank: 1, market: 'Crypto', rake: '$5,240', vol: '$124,500', pct: '4.2%' },
                    { rank: 2, market: 'Tech', rake: '$3,488', vol: '$87,200', pct: '4.0%' },
                    { rank: 3, market: 'Sports', rake: '$2,904', vol: '$72,620', pct: '4.0%' },
                    { rank: 4, market: 'Finance', rake: '$980', vol: '$24,500', pct: '4.0%' }].map((r) => (
                    <tr key={r.rank}>
                      <td><span className="badge badge-orange">#{r.rank}</span></td>
                      <td style={{ fontWeight: 600 }}>{r.market}</td>
                      <td style={{ color: '#10b981', fontWeight: 700 }}>{r.rake}</td>
                      <td>{r.vol}</td>
                      <td>{r.pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
