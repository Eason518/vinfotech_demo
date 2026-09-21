import { useState } from 'react';

const seriesColors = ['#F7931A', '#627EEA', '#9945FF', '#00AAE4', '#E84142', '#3C3C3D'];
const symbolColors = {
  'BNB/USDT': '#F3BA2F', 'DOGE/USDT': '#C2A633', 'SOL/USDT': '#9945FF',
  'XRP/USDT': '#00AAE4', 'BTC/USDT': '#F7931A', 'ETH/USDT': '#627EEA',
};

const initialData = [
  { id: 1, live: true, name: 'BNB Up or Down 5m', recurrence: '5m', symbol: 'BNB/USDT', color: '#F3BA2F', budget: '$100', spread: '$0.02' },
  { id: 2, live: true, name: 'DOGE Up or Down 5m', recurrence: '5m', symbol: 'DOGE/USDT', color: '#C2A633', budget: '$100', spread: '$0.02' },
  { id: 3, live: true, name: 'SOL Up or Down 5m', recurrence: '5m', symbol: 'SOL/USDT', color: '#9945FF', budget: '$100', spread: '$0.02' },
  { id: 4, live: true, name: 'XRP Up or Down 5m', recurrence: '5m', symbol: 'XRP/USDT', color: '#00AAE4', budget: '$100', spread: '$0.02' },
  { id: 5, live: true, name: 'BTC Up or Down 5m', recurrence: '5m', symbol: 'BTC/USDT', color: '#F7931A', budget: '$100', spread: '$0.02' },
  { id: 6, live: true, name: 'ETH Up or Down 5m', recurrence: '5m', symbol: 'ETH/USDT', color: '#627EEA', budget: '$100', spread: '$0.02' },
];

export default function CryptoMapping() {
  const [data] = useState(initialData);
  const [search, setSearch] = useState('');
  const [assetFilter, setAssetFilter] = useState('All');
  const [intervalFilter, setIntervalFilter] = useState('5m');

  const filtered = data.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchAsset = assetFilter === 'All' || d.symbol.startsWith(assetFilter.toUpperCase().slice(0,3));
    return matchSearch && matchAsset;
  });

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">Mapping & Assets</div>
          <div className="market-page-subtitle">Map and configure series with assets and trading settings.</div>
        </div>
        <button className="btn-orange">+ Add Series</button>
      </div>

      <div className="market-card" style={{ padding: 16 }}>
        <div className="market-filters">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>ASSET</div>
            <select className="market-select" value={assetFilter} onChange={(e) => setAssetFilter(e.target.value)}>
              <option>All</option><option>Bitcoin</option><option>Ethereum</option><option>Solana</option>
              <option>XRP</option><option>Dogecoin</option><option>BNB</option>
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>INTERVAL</div>
            <select className="market-select" value={intervalFilter} onChange={(e) => setIntervalFilter(e.target.value)}>
              <option value="5m">5m</option><option value="15m">15m</option><option value="1h">1h</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>SEARCH</div>
            <input className="market-input" style={{ width: '100%', boxSizing: 'border-box' }} placeholder="Search series name..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>LIVE?</th><th>SERIES NAME</th><th>RECURRENCE</th><th>SYMBOL</th>
                <th>COLOR</th><th>EXPOSURE BUDGET</th><th>SPREAD</th><th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td><span className="badge badge-live">LIVE</span></td>
                  <td style={{ fontWeight: 600 }}>{row.name}</td>
                  <td>{row.recurrence}</td>
                  <td>
                    <span className="badge" style={{ background: '#f3f4f6', color: '#1a1f2e', fontFamily: 'monospace' }}>
                      {row.symbol}
                    </span>
                  </td>
                  <td>
                    <span className="color-dot" style={{ background: row.color, display: 'inline-block', width: 18, height: 18, borderRadius: '50%', border: '1px solid #e5e7eb' }}></span>
                  </td>
                  <td>{row.budget}</td>
                  <td>{row.spread}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-icon btn-sm">Edit</button>
                      <button className="btn-orange btn-sm" style={{ padding: '4px 10px' }}>Pause</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="market-pagination" style={{ padding: '12px 16px' }}>
          <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select className="market-select" style={{ width: 'auto', padding: '4px 8px' }}>
              <option>10</option><option>25</option><option>50</option>
            </select>
            <span style={{ fontSize: 12, color: '#6b7280' }}>per page</span>
            <button className="page-btn">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
