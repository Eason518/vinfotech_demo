import Layout from '../../components/Layout';
import { notifications } from '../../data/mockData';
export default function CommDashboard() {
  return (
    <Layout title="Communication">
      <div className="page-header"><p className="breadcrumb">Home / Communication / <span>Dashboard</span></p><h1>Communication Dashboard</h1></div>
      <div className="stats-grid">
        <div className="stat-card"><div className="s-label">Total Sent</div><div className="s-value">2</div></div>
        <div className="stat-card"><div className="s-label">Draft</div><div className="s-value">1</div></div>
        <div className="stat-card"><div className="s-label">Total Reach</div><div className="s-value">79,497</div></div>
      </div>
      <div className="card">
        <div className="card-title">Recent Notifications</div>
        <div className="table-wrapper"><table>
          <thead><tr><th>Title</th><th>Type</th><th>Reach</th><th>Sent Date</th><th>Status</th></tr></thead>
          <tbody>{notifications.map(n => (
            <tr key={n.id}>
              <td><strong>{n.title}</strong><br/><span style={{fontSize:'12px',color:'var(--text-muted)'}}>{n.body}</span></td>
              <td><span className="badge badge-info">{n.type}</span></td>
              <td>{n.reach.toLocaleString()}</td>
              <td>{n.sent}</td>
              <td><span className={`badge ${n.status==='Sent'?'badge-success':'badge-secondary'}`}>{n.status}</span></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
    </Layout>
  );
}
