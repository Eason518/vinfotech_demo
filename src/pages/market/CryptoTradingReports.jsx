import { useState } from 'react';

const initialReports = [
  { id: 1, title: 'BNB Up or Down 5m (2026-07-21)', userBets: '$0.00', ammBets: '$0.00', ammPayout: '$0.00', netPnl: '+$0.00', pnlPct: '0.00%', outcome: 'Pending' },
  { id: 2, title: 'DOGE Up or Down 5m (2026-07-21)', userBets: '$0.00', ammBets: '$0.00', ammPayout: '$0.00', netPnl: '+$0.00', pnlPct: '0.00%', outcome: 'Pending' },
  { id: 3, title: 'SOL Up or Down 5m (2026-07-21)', userBets: '$0.00', ammBets: '$0.00', ammPayout: '$0.00', netPnl: '+$0.00', pnlPct: '0.00%', outcome: 'Pending' },
  { id: 4, title: 'BTC Up or Down 5m (2026-07-20)', userBets: '$124.50', ammBets: '$80.00', ammPayout: '$156.80', netPnl: '+$47.70', pnlPct: '+38.3%', outcome: 'Up' },
  { id: 5, title: 'ETH Up or Down 5m (2026-07-20)', userBets: '$98.00', ammBets: '$60.00', ammPayout: '$120.00', netPnl: '+$38.00', pnlPct: '+38.8%', outcome: 'Down' },
];

const statCards = [
  { label: 'User Bets (Total)', value: '$0.00', sub: 'Total amount placed by users' },
  { label: 'AMM Bets (Total)', value: '$0.00', sub: 'Automated market maker bets' },
  { label: 'AMM Payout (Total)', value: '$0.00', sub: 'Total AMM payouts made' },
  { label: 'Net Profit/Loss', value: '+$0.00', sub: 'Platform net profit', green: true },
  { label: 'Win Rate', value: '0.00%', sub: '0/0 windows won' },
];

export default function CryptoTradingReports() {
  const [activeDate, setActiveDate] = useState('Today');

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">Trading Reports</div>
          <div className="market-page-subtitle">View trading performance and P/L summary for each asset and time interval.</div>
        </div>
        <button className="btn-outline">Export Report</button>
      </div>

      <div className="market-card" style={{ padding: 16 }}>
        <div className="market-filters" style={{ flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>ASSET</div>
            <select className="market-select">
              <option>All</option><option>Bitcoin</option><option>Ethereum</option><option>Solana</option>
              <option>XRP</option><option>Dogecoin</option><option>BNB</option>
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>INTERVAL</div>
            <select className="market-select"><option>5 Minutes</option><option>15 Minutes</option><option>1 Hour</option></select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>DATE RANGE</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['Yesterday', 'Today'].map((d) => (
                <button key={d} onClick={() => setActiveDate(d)}
                  style={{ padding: '6px 12px', border: '1px solid', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    borderColor: activeDate === d ? '#FF6B35' : '#d1d5db',
                    background: activeDate === d ? '#FF6B35' : '#fff',
                    color: activeDate === d ? '#fff' : '#374151' }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>CUSTOM DATE RANGE</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input type="date" className="market-input" defaultValue="2026-07-01" />
              <input type="date" className="market-input" defaultValue="2026-07-21" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>RESOLUTION</div>
            <select className="market-select"><option>All</option><option>Up</option><option>Down</option><option>Pending</option></select>
          </div>
          <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-end' }}>
            <button className="btn-outline">Clear Filters</button>
            <button className="btn-outline">Refresh</button>
          </div>
        </div>
      </div>

      <div className="market-cards-grid market-cards-grid-5" style={{ marginBottom: 20 }}>
        {statCards.map((c) => (
          <div key={c.label} className="stat-card">
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: c.green ? '#10b981' : '#1a1f2e' }}>{c.value}</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>QUESTION TITLE</th><th>USER BETS</th><th>AMM BETS</th>
                <th>AMM PAYOUT</th><th>NET P/L</th><th>P/L %</th><th>OUTCOME/ACTION</th>
              </tr>
            </thead>
            <tbody>
              {initialReports.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500 }}>{r.title}</td>
                  <td>{r.userBets}</td>
                  <td>{r.ammBets}</td>
                  <td>{r.ammPayout}</td>
                  <td style={{ color: r.netPnl.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: 600 }}>{r.netPnl}</td>
                  <td style={{ color: r.pnlPct.startsWith('+') ? '#10b981' : '#374151', fontWeight: 600 }}>{r.pnlPct}</td>
                  <td>
                    <span className={`badge ${r.outcome === 'Pending' ? 'badge-gray' : r.outcome === 'Up' ? 'badge-green' : 'badge-red'}`}>
                      {r.outcome}
                    </span>
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
