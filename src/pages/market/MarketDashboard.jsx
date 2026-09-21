import { useState } from 'react';
import { traders, volume, topMarkets, highValueTrader, avgTradeSize } from '../../data/marketMockData';

function Sparkline({ data }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 120, h = 40;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} className="sparkline-svg">
      <polyline points={points} fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function MarketDashboard() {
  const [activeFilter, setActiveFilter] = useState('OVERALL');
  const filters = ['OVERALL', 'TODAY', '7 DAYS', '30 DAYS'];

  return (
    <div>
      {/* Time Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div className="time-filter">
          {filters.map((f) => (
            <button
              key={f}
              className={`time-filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <input type="date" className="market-input" defaultValue="2026-07-01" />
        <span style={{ color: '#9ca3af', fontSize: 13 }}>to</span>
        <input type="date" className="market-input" defaultValue="2026-07-21" />
      </div>

      {/* Cards Row 1: Traders + Volume */}
      <div className="market-cards-grid market-cards-grid-2" style={{ marginBottom: 16 }}>
        {/* TRADERS */}
        <div className="stat-card">
          <div className="market-card-header">
            <div className="stat-card-label">TRADERS</div>
            <Sparkline data={traders.sparkline} />
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>Total Traders</div>
              <div className="stat-card-value">{traders.total.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>Active Traders</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1f2e' }}>{traders.active}</div>
              <div className="stat-card-sub">
                <span className="stat-change-up">{traders.activeChange}</span>
                <span>vs last period</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>New Traders</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1f2e' }}>{traders.new}</div>
              <div className="stat-card-sub">
                <span className="stat-change-up">{traders.newChange}</span>
                <span>vs last period</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOTAL VOLUME */}
        <div className="stat-card">
          <div className="stat-card-label">TOTAL VOLUME</div>
          <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>Unmatched Vol.</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1f2e' }}>{volume.unmatched}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>Matched Vol.</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#ef4444' }}>{volume.matched}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>Total Earning</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#10b981' }}>{volume.totalEarning}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Row 2 */}
      <div className="market-cards-grid market-cards-grid-3">
        {/* TOP MARKET BY VOLUME */}
        <div className="stat-card">
          <div className="stat-card-label">TOP MARKET BY VOLUME</div>
          <table style={{ width: '100%', marginTop: 8 }}>
            <tbody>
              {topMarkets.map((m) => (
                <tr key={m.name}>
                  <td style={{ padding: '6px 0', fontSize: 13, color: '#374151', fontWeight: 500 }}>{m.name}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                      <div style={{
                        width: `${(m.volume / topMarkets[0].volume) * 80}px`,
                        height: 6,
                        background: '#FF6B35',
                        borderRadius: 3,
                        opacity: 0.7,
                      }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1f2e', minWidth: 40, textAlign: 'right' }}>
                        ${m.volume.toLocaleString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PROFITS BY HIGH VALUE TRADER */}
        <div className="stat-card">
          <div className="stat-card-label">PROFITS BY HIGH VALUE TRADER</div>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#1a1f2e' }}>{highValueTrader.profit}</div>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <span style={{ fontSize: 20, color: '#10b981' }}>▲</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>{highValueTrader.overallProfitPct}</span>
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Overall Profit</div>
          </div>
        </div>

        {/* AVERAGE TRADE SIZE */}
        <div className="stat-card">
          <div className="stat-card-label">AVERAGE TRADE SIZE</div>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#1a1f2e' }}>{avgTradeSize.value}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>Avg. Trade Value</div>
          </div>
        </div>
      </div>
    </div>
  );
}
