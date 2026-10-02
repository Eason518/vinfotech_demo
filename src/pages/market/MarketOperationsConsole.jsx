import { useState, useEffect } from 'react';
import { marketOpsConsole } from '../../data/marketMockData';

const statusBadge = (status) => {
  const map = {
    Live: 'badge-green',
    Awaiting: 'badge-red',
    Resolved: 'badge-blue',
    Closed: 'badge-gray',
  };
  return map[status] || 'badge-gray';
};

function SortIcon() {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', marginLeft: 4, lineHeight: 0.6, opacity: 0.4 }}>
      <span style={{ fontSize: 8 }}>▲</span>
      <span style={{ fontSize: 8 }}>▼</span>
    </span>
  );
}

export default function MarketOperationsConsole() {
  const [now, setNow] = useState(new Date());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All categories');
  const [hideSports, setHideSports] = useState(false);
  const [hideCrypto, setHideCrypto] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const categories = ['All categories', ...Array.from(new Set(marketOpsConsole.map((m) => m.category.split(',')[0])))];

  const filtered = marketOpsConsole.filter((m) => {
    if (search && !m.market.toLowerCase().includes(search.toLowerCase()) && !m.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'All categories' && !m.category.startsWith(category)) return false;
    if (hideSports && /NFL|NHL|MLB|WNBA|Soccer|Football|Cup/i.test(m.category)) return false;
    if (hideCrypto && /Crypto/i.test(m.category)) return false;
    return true;
  });

  const pastClose = marketOpsConsole.filter((m) => m.status === 'Awaiting').length;
  const closingSoon = marketOpsConsole.filter((m) => m.closes.includes('h') && !m.closes.includes('d')).length;
  const featuredCount = marketOpsConsole.filter((m) => m.featured).length;

  const resetFilter = () => {
    setSearch(''); setCategory('All categories'); setHideSports(false); setHideCrypto(false);
  };

  const fmtTime = (d) => d.toLocaleTimeString('en-GB', { hour12: false });

  return (
    <div>
      <div className="market-page-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <div className="market-page-title">Market Operations Console</div>
          <div className="market-page-subtitle">Monitor and operate every live market from one place</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f3f4f6', borderRadius: 20, padding: '6px 14px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          <span style={{ fontSize: 13, color: '#374151' }}>Live</span>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>{fmtTime(now)}</span>
        </div>
      </div>

      {/* Status cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
        <div className="market-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', marginBottom: 0 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1f2e' }}>{pastClose}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Past close, not resolved</div>
            <div style={{ fontSize: 11.5, color: '#9ca3af' }}>Payouts blocked</div>
          </div>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>!</span>
        </div>
        <div className="market-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', marginBottom: 0 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1f2e' }}>{closingSoon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Closing in under 2 hours</div>
            <div style={{ fontSize: 11.5, color: '#9ca3af' }}>Check before close</div>
          </div>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⏱</span>
        </div>
        <div className="market-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', marginBottom: 0 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1f2e' }}>{featuredCount}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Featured markets</div>
            <div style={{ fontSize: 11.5, color: '#9ca3af' }}>On the homepage rail</div>
          </div>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: '#ede9fe', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>★</span>
        </div>
      </div>

      {/* Filter row */}
      <div className="market-card" style={{ padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <input
            className="market-input"
            placeholder="Search market question or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: '1 1 260px', minWidth: 200 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: '#6b7280' }}>Category</span>
            <select className="market-select" value={category} onChange={(e) => setCategory(e.target.value)} style={{ minWidth: 130 }}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: '#6b7280' }}>AMM</span>
            <select className="market-select" style={{ minWidth: 100 }}>
              <option>AMM: any</option>
              <option>AMM: on</option>
              <option>AMM: off</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: '#6b7280' }}>Expiry</span>
            <select className="market-select" style={{ minWidth: 110 }}>
              <option>Any expiry</option>
              <option>Next 24h</option>
              <option>Next 7 days</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={hideSports} onChange={(e) => setHideSports(e.target.checked)} style={{ accentColor: '#FF6B35' }} />
            Hide sports
          </label>
          <label style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer',
            padding: '5px 10px', borderRadius: 6,
            background: hideCrypto ? '#dbeafe' : 'transparent',
          }}>
            <input type="checkbox" checked={hideCrypto} onChange={(e) => setHideCrypto(e.target.checked)} style={{ accentColor: '#3a7bd5' }} />
            Hide crypto
          </label>
          <button className="btn-outline btn-sm" onClick={resetFilter}>⟲ Reset filter</button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: '#6b7280', margin: '12px 0' }}>
        <span>{Math.min(visibleCount, filtered.length)} of {marketOpsConsole.length} markets shown</span>
        <span>|</span>
        <span>Sorted by <strong>Status ascending</strong></span>
      </div>

      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>SRC</th>
                <th>CATEGORY<SortIcon /></th>
                <th>MARKET</th>
                <th>LIVE STATUS</th>
                <th>STATUS<SortIcon /></th>
                <th>VOLUME<SortIcon /></th>
                <th>TRADERS</th>
                <th>AMM EXP.<SortIcon /></th>
                <th>CLOSES<SortIcon /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, visibleCount).map((m, i) => (
                <tr key={i} style={{ background: m.status === 'Awaiting' ? '#fff8f7' : undefined }}>
                  <td><span className="badge badge-gray" style={{ fontFamily: 'monospace' }}>{m.src}</span></td>
                  <td style={{ maxWidth: 220 }}>{m.category}</td>
                  <td style={{ fontWeight: 500 }}>
                    {m.market}
                    {m.multi && <span className="badge badge-gray" style={{ marginLeft: 6 }}>+1</span>}
                    {m.featured && <span style={{ marginLeft: 6, color: '#7c3aed' }}>★</span>}
                  </td>
                  <td>{m.liveStatus === 'Live' ? <span className="badge badge-live">LIVE</span> : m.liveStatus}</td>
                  <td><span className={`badge ${statusBadge(m.status)}`}>{m.status}</span></td>
                  <td>{m.volume}</td>
                  <td>{m.traders}</td>
                  <td>{m.ammExp}</td>
                  <td style={{ color: m.closes === 'Closed' ? '#9ca3af' : '#374151', fontWeight: 600 }}>{m.closes}</td>
                  <td style={{ color: '#9ca3af' }}>›</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} style={{ textAlign: 'center', color: '#9ca3af', padding: '28px 0' }}>No markets match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {visibleCount < filtered.length && (
          <div style={{ textAlign: 'center', padding: 16, borderTop: '1px solid #f3f4f6' }}>
            <button className="btn-outline btn-sm" onClick={() => setVisibleCount((v) => v + 50)}>
              Load 50 more markets
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, color: '#9ca3af', marginTop: 14 }}>
        <span><span className="badge badge-gray" style={{ fontFamily: 'monospace' }}>??</span> Source: unknown provider</span>
        <span><span className="badge badge-gray">+1</span> multi-option market</span>
        <span><span style={{ color: '#7c3aed' }}>★</span> featured</span>
        <span>Row tint: <span style={{ color: '#ef4444', fontWeight: 600 }}>red</span> = awaiting resolution — payouts blocked</span>
      </div>
    </div>
  );
}
