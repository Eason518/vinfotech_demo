import { useState } from 'react';
import Layout from '../../components/Layout';
import { paymentGateways as initialGateways } from '../../data/mockData';

export default function PaymentManagement() {
  const [gateways, setGateways] = useState(initialGateways);
  const toggle = (id, field) => setGateways(g => g.map(gw => gw.id===id ? {...gw, [field]:!gw[field]} : gw));

  return (
    <Layout title="Payment Management">
      <div className="page-header">
        <p className="breadcrumb">Home / Settings / <span>Payment Management</span></p>
        <h1>Manage Payment Gateways</h1>
      </div>
      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Image</th><th>Title</th><th>Description</th><th>Deposit</th><th>Withdrawal</th><th>Status</th><th>Action</th>
            </tr></thead>
            <tbody>
              {gateways.map(g => (
                <tr key={g.id}>
                  <td style={{fontSize:'28px'}}>{g.image}</td>
                  <td><strong>{g.title}</strong>{g.isManual && <span className="badge badge-warning" style={{marginLeft:'8px',fontSize:'10px'}}>Manual</span>}</td>
                  <td style={{fontSize:'12px',color:'var(--text-muted)'}}>{g.description}</td>
                  <td>
                    <label className="toggle">
                      <input type="checkbox" checked={g.depositEnabled} onChange={()=>toggle(g.id,'depositEnabled')} />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <label className="toggle">
                      <input type="checkbox" checked={g.withdrawalEnabled} onChange={()=>toggle(g.id,'withdrawalEnabled')} />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                  <td><span className="badge badge-success">{g.status}</span></td>
                  <td><button className="btn btn-xs btn-outline">Configure</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="alert alert-info mt-4">
          Manual PG allows admin to manually approve/reject deposit and withdrawal requests without a payment gateway integration.
        </div>
      </div>
    </Layout>
  );
}
