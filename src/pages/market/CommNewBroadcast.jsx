import { useState } from 'react';
import { broadcastMarkets } from '../../data/marketMockData';

const steps = [
  { num: '01', label: 'Markets' },
  { num: '02', label: 'Compose' },
  { num: '03', label: 'Audience' },
  { num: '04', label: 'Review' },
];

const filters = ['All Markets', 'Red hot', 'New', 'POPULAR'];
const tagMap = { hot: 'Red hot', new: 'New', popular: 'POPULAR' };

export default function CommNewBroadcast() {
  const [channel, setChannel] = useState('email');
  const [filter, setFilter] = useState('All Markets');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);

  const filtered = broadcastMarkets.filter((m) => {
    if (filter !== 'All Markets' && tagMap[m.tag] !== filter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggle = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div>
      <div className="market-page-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <div className="market-page-title">New Broadcast</div>
        </div>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>Draft · autosaved</span>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 22, height: 22, borderRadius: '50%', fontSize: 11, fontWeight: 700,
              background: i === 0 ? '#FF6B35' : '#f3f4f6',
              color: i === 0 ? '#fff' : '#9ca3af',
            }}>{s.num}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? '#1a1f2e' : '#9ca3af' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="market-card">
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Select markets</h3>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
          Pick a channel, then the new or red-hot markets this campaign covers.
        </p>

        {/* Channel selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div
            onClick={() => setChannel('in-app')}
            style={{
              border: `1px solid ${channel === 'in-app' ? '#FF6B35' : '#e5e7eb'}`,
              background: channel === 'in-app' ? '#fff5f0' : '#fff',
              borderRadius: 8, padding: '12px 16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <span style={{
              width: 16, height: 16, borderRadius: '50%', border: `2px solid ${channel === 'in-app' ? '#FF6B35' : '#d1d5db'}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {channel === 'in-app' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF6B35' }} />}
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>In-app notification</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>one notification · links to a single market</div>
            </div>
          </div>
          <div
            onClick={() => setChannel('email')}
            style={{
              border: `1px solid ${channel === 'email' ? '#FF6B35' : '#e5e7eb'}`,
              background: channel === 'email' ? '#fff5f0' : '#fff',
              borderRadius: 8, padding: '12px 16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <span style={{
              width: 16, height: 16, borderRadius: '50%', border: `2px solid ${channel === 'email' ? '#FF6B35' : '#d1d5db'}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {channel === 'email' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF6B35' }} />}
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Email campaign</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>full market list with live odds</div>
            </div>
          </div>
        </div>

        {/* Filter row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="btn-sm"
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: filter === f ? '1px solid #1a1f2e' : '1px solid #e5e7eb',
                  background: filter === f ? '#1a1f2e' : '#fff',
                  color: filter === f ? '#fff' : '#374151',
                }}
              >{f}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className="market-input"
              placeholder="Search markets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 200 }}
            />
            <select className="market-select" style={{ minWidth: 130 }}>
              <option>All categories</option>
              <option>Crypto</option>
              <option>Tech</option>
              <option>Economy</option>
            </select>
          </div>
        </div>

        {/* Market list */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          {filtered.map((m, i) => (
            <div
              key={m.id}
              onClick={() => toggle(m.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', cursor: 'pointer',
                borderBottom: i === filtered.length - 1 ? 'none' : '1px solid #f3f4f6',
                background: selected.includes(m.id) ? '#fff5f0' : '#fff',
              }}
            >
              <input type="checkbox" checked={selected.includes(m.id)} onChange={() => {}} style={{ accentColor: '#FF6B35', width: 16, height: 16 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1a1f2e' }}>{m.name}</div>
                <div style={{ fontSize: 11.5, color: '#9ca3af', marginTop: 2 }}>{m.id} · {m.volume} volume</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>Yes {m.yesPrice}</div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>No markets found.</div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>{selected.length} markets selected</span>
          <button className="btn-orange" disabled={selected.length === 0} style={{ opacity: selected.length === 0 ? 0.5 : 1 }}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
