import { useState } from 'react';
import Layout from '../../components/Layout';
import { toast } from '../../components/Toast';
import { paymentGateways as initialGateways } from '../../data/mockData';

export default function PaymentManagement() {
  const [gateways, setGateways] = useState(initialGateways);
  const [manualPG, setManualPG] = useState(true);

  const toggle = (id, field) => setGateways(g => g.map(gw => gw.id === id ? { ...gw, [field]: !gw[field] } : gw));

  return (
    <Layout title="Manage Payment Gateway">
      <div className="page-header">
        <p className="breadcrumb">Home / Settings / <span>Payment Management</span></p>
        <div className="flex justify-between items-center">
          <h1>Manage Payment Gateway</h1>
        </div>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Manual PG</span>
            <span className="badge badge-warning" style={{ fontSize: '10px' }}>Manual</span>
            <label className="toggle">
              <input type="checkbox" checked={manualPG} onChange={() => {
                setManualPG(!manualPG);
                toast(manualPG ? 'Manual PG disabled' : 'Manual PG enabled', 'info');
              }} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th><th>Title</th><th>Description</th><th>Deposit</th><th>Withdrawal</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {gateways.filter(g => !g.isManual).map(g => (
                <tr key={g.id}>
                  <td style={{ fontSize: '28px' }}>{g.image}</td>
                  <td><strong>{g.title}</strong></td>
                  <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{g.description}</td>
                  <td>
                    <label className="toggle">
                      <input type="checkbox" checked={g.depositEnabled} onChange={() => toggle(g.id, 'depositEnabled')} />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <label className="toggle">
                      <input type="checkbox" checked={g.withdrawalEnabled} onChange={() => toggle(g.id, 'withdrawalEnabled')} />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                  <td><button className="btn btn-xs btn-outline">Configure</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
