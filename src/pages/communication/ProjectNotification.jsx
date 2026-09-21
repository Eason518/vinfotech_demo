import { useState } from 'react';
import Layout from '../../components/Layout';

export default function ProjectNotification() {
  const [filters, setFilters] = useState({
    status: 'All',
    type: 'All',
    category: '',
    gameModule: '',
    language: '',
  });

  const handleClear = () => setFilters({ status: 'All', type: 'All', category: '', gameModule: '', language: '' });

  return (
    <Layout title="Project Notifications">
      <div className="page-header">
        <p className="breadcrumb">Home / Communication / <span>Project Notifications</span></p>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="filter-row" style={{ flexWrap: 'wrap' }}>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-control" value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-control" value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
              <option>All</option>
              <option>Push</option>
              <option>Email</option>
              <option>SMS</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-control" value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}>
              <option value="">Select...</option>
              <option>Sports</option>
              <option>Finance</option>
              <option>Account</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Game Module</label>
            <select className="form-control" value={filters.gameModule} onChange={e => setFilters({ ...filters, gameModule: e.target.value })}>
              <option value="">Select...</option>
              <option>Cricket</option>
              <option>Football</option>
              <option>Kabaddi</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Language</label>
            <select className="form-control" value={filters.language} onChange={e => setFilters({ ...filters, language: e.target.value })}>
              <option value="">Select...</option>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
            <button className="btn btn-danger btn-sm">Apply Filters</button>
            <button className="btn btn-outline btn-sm" onClick={handleClear}>Clear Filters</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '16px' }}>Recent Communication</div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Message</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No data available.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
