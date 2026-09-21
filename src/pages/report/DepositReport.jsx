import Layout from '../../components/Layout';
import { depositReports } from '../../data/mockData';
export default function DepositReport() {
  return (
    <Layout title="User Deposit Amount">
      <div className="page-header"><p className="breadcrumb">Home / Report / <span>User Deposit Amount</span></p><h1>User Deposit Amount Report</h1></div>
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
          <thead><tr><th>User ID</th><th>Username</th><th>Full Name</th><th>Total Deposit Amount</th><th>Deposit Count</th><th>Avg. Deposit</th><th>Last Deposit</th></tr></thead>
          <tbody>{depositReports.map(u => (
            <tr key={u.userId}>
              <td style={{fontFamily:'monospace',fontSize:'12px'}}>{u.userId}</td>
              <td><strong>{u.username}</strong></td>
              <td>{u.fullName}</td>
              <td style={{fontWeight:700,color:'var(--primary)',fontSize:'15px'}}>Rs.{u.totalDepositAmount.toLocaleString()}</td>
              <td style={{textAlign:'center'}}>{u.depositCount}</td>
              <td>Rs.{u.avgDeposit.toFixed(2)}</td>
              <td>{u.lastDeposit}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
    </Layout>
  );
}
