import { useState } from 'react';
import Layout from '../../components/Layout';

export default function CommDashboard() {
  const [filters, setFilters] = useState({ from: '', to: '' });
  const [applied, setApplied] = useState(false);

  const emailDelivered = 0;
  const emailFailed = 0;
  const notifDelivered = 0;
  const notifFailed = 0;
  const emailPct = emailDelivered / (emailDelivered + emailFailed);
  const notifPct = notifDelivered / (notifDelivered + notifFailed);

  return (
    <Layout title="Communication Dashboard">
      <div className="page-header">
        <p className="breadcrumb">Home / Communication / <span>Dashboard</span></p>
        <h1>Communication Dashboard</h1>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="filter-row">
          <div className="form-group">
            <label className="form-label">From Date</label>
            <input type="date" className="form-control" value={filters.from} onChange={e => setFilters({ ...filters, from: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">To Date</label>
            <input type="date" className="form-control" value={filters.to} onChange={e => setFilters({ ...filters, to: e.target.value })} />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-end' }} onClick={() => setApplied(true)}>Apply</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '16px' }}>Total Emails sent</div>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Delivered</div>
              <div style={{ fontWeight: 700, fontSize: '28px', color: 'var(--success)' }}>{emailDelivered}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Failed</div>
              <div style={{ fontWeight: 700, fontSize: '28px', color: 'var(--danger)' }}>{emailFailed}</div>
            </div>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{(emailPct * 100).toFixed(0)}%</div>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '16px' }}>Total Notifications sent</div>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Delivered</div>
              <div style={{ fontWeight: 700, fontSize: '28px', color: 'var(--success)' }}>{notifDelivered}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Failed</div>
              <div style={{ fontWeight: 700, fontSize: '28px', color: 'var(--danger)' }}>{notifFailed}</div>
            </div>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{(notifPct * 100).toFixed(0)}%</div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '16px' }}>Scheduled Communication</div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Details</th>
                <th>Urgency</th>
                <th>Date</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No scheduled communications.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
