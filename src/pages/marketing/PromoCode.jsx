import { useState } from 'react';
import { Edit2, Trash2, Tag, CheckCircle, XCircle, Hash } from 'lucide-react';
import { toast } from '../../components/Toast';
import Layout from '../../components/Layout';

const initialData = [
  { id: 'PC001', code: 'WELCOME50', type: 'Percentage', value: 50, minDeposit: 100, maxBonus: 500, usedCount: 234, totalLimit: 1000, expiryDate: '2024-12-31', status: 'Active' },
  { id: 'PC002', code: 'FLAT100', type: 'Flat', value: 100, minDeposit: 500, maxBonus: 100, usedCount: 89, totalLimit: 500, expiryDate: '2024-06-30', status: 'Active' },
  { id: 'PC003', code: 'IPL2024', type: 'Percentage', value: 25, minDeposit: 200, maxBonus: 1000, usedCount: 567, totalLimit: 2000, expiryDate: '2024-05-31', status: 'Expired' },
  { id: 'PC004', code: 'NEWUSER', type: 'Flat', value: 50, minDeposit: 100, maxBonus: 50, usedCount: 123, totalLimit: 9999, expiryDate: '2025-12-31', status: 'Active' },
];

const emptyForm = { code: '', type: 'Percentage', value: '', minDeposit: '', maxBonus: '', totalLimit: '', expiryDate: '', status: 'Active' };

export default function PromoCode() {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ date: '', endDate: '', type: '', mode: '', search: '' });
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = data.filter(p =>
    (!filters.search || p.code.toLowerCase().includes(filters.search.toLowerCase())) &&
    (!filters.type || p.type === filters.type)
  );

  const toggleStatus = (id) => setData(d => d.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Expired' : 'Active' } : p));

  const deleteCode = (id) => {
    setData(d => d.filter(p => p.id !== id));
    toast('Promo code deleted', 'error');
  };

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p) => {
    setEditItem(p);
    setForm({ code: p.code, type: p.type, value: String(p.value), minDeposit: String(p.minDeposit), maxBonus: String(p.maxBonus), totalLimit: String(p.totalLimit), expiryDate: p.expiryDate, status: p.status });
    setShowModal(true);
  };

  const save = () => {
    if (editItem) {
      setData(d => d.map(p => p.id === editItem.id ? { ...p, ...form, value: +form.value, minDeposit: +form.minDeposit, maxBonus: +form.maxBonus, totalLimit: +form.totalLimit } : p));
      toast('Promo code updated', 'success');
    } else {
      setData(d => [...d, { ...form, id: 'PC' + (d.length + 1).toString().padStart(3, '0'), usedCount: 0, value: +form.value, minDeposit: +form.minDeposit, maxBonus: +form.maxBonus, totalLimit: +form.totalLimit }]);
      toast('Promo code created', 'success');
    }
    setShowModal(false);
  };

  const totalUsed = data.reduce((s, p) => s + p.usedCount, 0);
  const activeCount = data.filter(p => p.status === 'Active').length;

  return (
    <Layout title="Promo Code List">
      <div className="page-header">
        <p className="breadcrumb">Home / Marketing / <span>Promo Code</span></p>
        <div className="flex justify-between items-center">
          <h1>Promo Code List</h1>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '20px', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {[[Tag, 'Total Codes', data.length, '#3a7bd5'], [CheckCircle, 'Active', activeCount, '#28a745'], [XCircle, 'Expired', data.filter(p => p.status === 'Expired').length, '#dc3545'], [Hash, 'Total Redemptions', totalUsed, '#6f42c1']].map(([Icon, l, v, c]) => (
          <div key={l} className="stat-card">
            <div style={{ background: c + '18', borderRadius: '10px', padding: '9px', display: 'inline-flex', marginBottom: '10px' }}><Icon size={20} color={c} /></div>
            <div className="s-label">{l}</div>
            <div className="s-value" style={{ fontSize: '22px', color: c }}>{v}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div className="filter-row" style={{ margin: 0, flex: 1 }}>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" value={filters.date} onChange={e => setFilters({ ...filters, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input type="date" className="form-control" value={filters.endDate} onChange={e => setFilters({ ...filters, endDate: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Select Type</label>
              <select className="form-control" value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
                <option value="">Select</option>
                <option>Percentage</option>
                <option>Flat</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mode</label>
              <select className="form-control" value={filters.mode} onChange={e => setFilters({ ...filters, mode: e.target.value })}>
                <option value="">Select</option>
                <option>Active</option>
                <option>Expired</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Search By Code</label>
              <input className="form-control" placeholder="Search code..." value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })} />
            </div>
            <button className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-end' }} onClick={() => setFilters({ date: '', endDate: '', type: '', mode: '', search: '' })}>Clear Filters</button>
          </div>
          <button className="btn btn-success btn-sm" onClick={openAdd}>+ New Promo Code</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Code</th><th>Type</th><th>Discount</th><th>Min Deposit</th>
                <th>Max Bonus</th><th>Used/Limit</th><th>Progress</th><th>Expiry</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const usedPct = Math.min(100, Math.round((p.usedCount / p.totalLimit) * 100));
                return (
                  <tr key={p.id}>
                    <td>
                      <code style={{ background: p.status === 'Active' ? '#d4edda' : '#e2e3e5', color: p.status === 'Active' ? '#155724' : '#6c757d', padding: '3px 10px', borderRadius: '6px', fontWeight: 800, fontSize: '13px', letterSpacing: '1px' }}>{p.code}</code>
                    </td>
                    <td><span className={`badge ${p.type === 'Percentage' ? 'badge-info' : 'badge-primary'}`}>{p.type}</span></td>
                    <td style={{ fontWeight: 700 }}>{p.type === 'Percentage' ? p.value + '%' : 'Rs.' + p.value}</td>
                    <td>Rs.{p.minDeposit}</td>
                    <td>Rs.{p.maxBonus}</td>
                    <td style={{ fontWeight: 600 }}>{p.usedCount} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {p.totalLimit}</span></td>
                    <td style={{ minWidth: '100px' }}>
                      <div style={{ background: '#f0f2f4', borderRadius: '4px', height: '6px' }}>
                        <div style={{ background: usedPct > 80 ? 'var(--danger)' : 'var(--primary)', height: '100%', borderRadius: '4px', width: usedPct + '%' }}></div>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{usedPct}%</span>
                    </td>
                    <td style={{ fontSize: '12px', color: new Date(p.expiryDate) < new Date() ? 'var(--danger)' : 'var(--text-muted)' }}>{p.expiryDate}</td>
                    <td>
                      <label className="toggle">
                        <input type="checkbox" checked={p.status === 'Active'} onChange={() => toggleStatus(p.id)} />
                        <span className="toggle-slider"></span>
                      </label>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-xs btn-outline" onClick={() => openEdit(p)}><Edit2 size={11} /></button>
                        <button className="btn btn-xs btn-danger" onClick={() => deleteCode(p.id)}><Trash2 size={11} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No promo codes found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" style={{ width: '540px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editItem ? 'Edit' : 'Create'} Promo Code</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Code <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input className="form-control" placeholder="e.g. SUMMER25" value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} style={{ fontWeight: 700, letterSpacing: '1px' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>Percentage</option><option>Flat</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Value <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input className="form-control" type="number" placeholder={form.type === 'Percentage' ? 'e.g. 25' : 'e.g. 100'} value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Min Deposit <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input className="form-control" type="number" value={form.minDeposit} onChange={e => setForm({ ...form, minDeposit: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Max Bonus</label>
                <input className="form-control" type="number" value={form.maxBonus} onChange={e => setForm({ ...form, maxBonus: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Total Limit</label>
                <input className="form-control" type="number" value={form.totalLimit} onChange={e => setForm({ ...form, totalLimit: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Expiry Date <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input className="form-control" type="date" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option><option>Expired</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={!form.code || !form.value || !form.expiryDate}>
                {editItem ? 'Save Changes' : 'Create Code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
