import { useState } from 'react';
import Layout from '../components/Layout';

export default function LeaderboardPage({ title, metricLabel, metricValue, downloadable = true, data, valueKey, formatValue }) {
  const today = new Date();
  const monthAgo = new Date(today); monthAgo.setDate(today.getDate() - 1);
  const fmt = (d) => d.toISOString().slice(0, 10);
  const [from, setFrom] = useState(fmt(monthAgo));
  const [to, setTo] = useState(fmt(today));
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('');

  const filtered = data.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.username.toLowerCase().includes(q) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.mobile && r.mobile.toLowerCase().includes(q)) ||
      (r.city && r.city.toLowerCase().includes(q))
    );
  });

  const resetFilters = () => {
    setFrom(fmt(monthAgo)); setTo(fmt(today)); setSearch(''); setPeriod('');
  };

  return (
    <Layout title={title}>
      <div className="page-header">
        <p className="breadcrumb">Home / <span>Leaderboard</span></p>
        <div className="flex justify-between items-center">
          <h1>{title}</h1>
          <div className="flex gap-2" style={{ alignItems: 'center' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input type="date" className="form-control" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>to</span>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input type="date" className="form-control" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <button className="btn-icon" onClick={resetFilters} title="Reset filters">⟲</button>
            {downloadable && (
              <button className="btn btn-success btn-sm" title="Export">⬇</button>
            )}
          </div>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: '20px' }}>
        <div className="stat-card">
          <div className="s-label">{metricLabel}</div>
          <div className="s-value">{metricValue}</div>
        </div>
        <div className="stat-card">
          <div className="s-label">Users Ranked</div>
          <div className="s-value">{data.length}</div>
        </div>
      </div>

      <div className="card">
        <div className="filter-row">
          <div className="form-group">
            <label className="form-label">Search</label>
            <input
              className="form-control"
              placeholder="Username, Mobile, City, Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ minWidth: '240px' }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Select Period</label>
            <select className="form-control" value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="">Select Period</option>
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2" style={{ marginBottom: '14px' }}>
          <span style={{ color: 'var(--primary)' }}>●</span>
          <strong>{metricLabel}</strong>
          <span className="badge badge-primary">{data.length}</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Rank</th><th>User Name</th><th>Mobile</th><th>Email</th><th>City</th><th>{metricLabel}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No Record Found.</td></tr>
              ) : filtered.map((r) => (
                <tr key={r.rank}>
                  <td><span className="badge badge-primary">#{r.rank}</span></td>
                  <td><strong>{r.username}</strong></td>
                  <td>{r.mobile || '—'}</td>
                  <td>{r.email}</td>
                  <td>{r.city || '—'}</td>
                  <td style={{ fontWeight: 700, color: 'var(--success)' }}>
                    {formatValue ? formatValue(r[valueKey]) : r[valueKey]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
