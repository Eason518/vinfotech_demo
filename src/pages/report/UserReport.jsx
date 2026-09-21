import Layout from '../../components/Layout';
import { userReports } from '../../data/mockData';
export default function UserReport() {
  return (
    <Layout title="User Report">
      <div className="page-header"><p className="breadcrumb">Home / Report / <span>User Report</span></p><h1>User Report</h1></div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <input type="date" className="form-control" defaultValue="2024-01-01" style={{width:'160px'}} />
            <input type="date" className="form-control" defaultValue="2024-03-31" style={{width:'160px'}} />
            <button className="btn btn-primary btn-sm">Apply</button>
          </div>
          <button className="btn btn-outline btn-sm">Export CSV</button>
        </div>
        <div className="table-wrapper"><table>
          <thead><tr><th>User ID</th><th>Username</th><th>Full Name</th><th>Email</th><th>City</th><th>Total Contests</th><th>Total Deposit</th><th>Total Winnings</th><th>Referrals</th></tr></thead>
          <tbody>{userReports.map(u => (
            <tr key={u.id}>
              <td style={{fontFamily:'monospace',fontSize:'12px'}}>{u.id}</td>
              <td><strong>{u.username}</strong></td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.city}</td>
              <td style={{textAlign:'center'}}>{u.totalContests}</td>
              <td style={{fontWeight:600}}>Rs.{u.totalDeposit.toLocaleString()}</td>
              <td style={{fontWeight:600,color:'var(--success)'}}>Rs.{u.totalWinnings.toLocaleString()}</td>
              <td style={{textAlign:'center'}}>{u.referrals}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
    </Layout>
  );
}
