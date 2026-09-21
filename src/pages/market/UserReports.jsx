import { users } from '../../data/marketMockData';

export default function UserReports() {
  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">User Reports</div>
          <div className="market-page-subtitle">User Report Directory - Browse all users and inspect detailed account-level reports</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, color: '#6b7280' }}><strong>{users.length} User Reports</strong></span>
          <button className="btn-outline">Export</button>
        </div>
      </div>
      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr><th>USER NAME</th><th>EMAIL ADDRESS</th><th>USER ID</th><th>ACTIONS</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ color: '#6b7280' }}>{u.email}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{u.userId}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-orange btn-sm">View Report</button>
                      <button className="btn-icon btn-sm">Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
