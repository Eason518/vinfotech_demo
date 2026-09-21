import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import Layout from '../../components/Layout';
import { userReports } from '../../data/mockData';

const topContest = [
  { username: 'vijay_r', contests: 134 }, { username: 'priya_s', contests: 82 },
  { username: 'arjun_b', contests: 96 }, { username: 'rahul_k', contests: 47 }, { username: 'rakesh_t', contests: 31 },
];

const enriched = userReports.map(u => ({
  ...u,
  adminDeposited: parseFloat((Math.random()*2000).toFixed(2)),
  totalWithdrawal: parseFloat((Math.random()*5000).toFixed(2)),
  winningBalance: parseFloat((Math.random()*8000).toFixed(2)),
  registrationDate: u.id === 'UID001' ? '2024-01-15' : u.id === 'UID002' ? '2024-01-20' : '2024-02-15',
}));

export default function UserReport() {
  const [filters, setFilters] = useState({ from:'', to:'', emailVerified:'', profileStatus:'', deviceType:'', search:'' });

  const filtered = enriched.filter(u =>
    (!filters.search || u.username.toLowerCase().includes(filters.search.toLowerCase()) || u.fullName.toLowerCase().includes(filters.search.toLowerCase()))
  );

  const clear = () => setFilters({ from:'', to:'', emailVerified:'', profileStatus:'', deviceType:'', search:'' });

  return (
    <Layout title="User Report">
      <div className="page-header">
        <p className="breadcrumb">Home / Report / <span>User Report</span></p>
        <div className="flex justify-between items-center">
          <h1>User Report List</h1>
          <div style={{fontSize:'13px',color:'var(--text-muted)'}}>Total record count: {filtered.length}</div>
        </div>
      </div>

      <div className="card" style={{marginBottom:'20px'}}>
        <div className="filter-row">
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input type="date" className="form-control" value={filters.from} onChange={e=>setFilters({...filters,from:e.target.value})}/>
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input type="date" className="form-control" value={filters.to} onChange={e=>setFilters({...filters,to:e.target.value})}/>
          </div>
          <div className="form-group">
            <label className="form-label">Email Verified</label>
            <select className="form-control" value={filters.emailVerified} onChange={e=>setFilters({...filters,emailVerified:e.target.value})}>
              <option value="">Select</option><option>Yes</option><option>No</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Profile Status</label>
            <select className="form-control" value={filters.profileStatus} onChange={e=>setFilters({...filters,profileStatus:e.target.value})}>
              <option value="">Select</option><option>Active</option><option>Inactive</option><option>Blocked</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Device Type</label>
            <select className="form-control" value={filters.deviceType} onChange={e=>setFilters({...filters,deviceType:e.target.value})}>
              <option value="">Select</option><option>Android</option><option>iOS</option><option>Web</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Search User</label>
            <input className="form-control" placeholder="Search..." value={filters.search} onChange={e=>setFilters({...filters,search:e.target.value})}/>
          </div>
          <button className="btn btn-danger btn-sm" style={{alignSelf:'flex-end'}} onClick={clear}>Clear Filters</button>
          <button className="btn btn-outline btn-sm" style={{alignSelf:'flex-end'}}><Download size={13}/> Export</button>
        </div>
      </div>

      <div className="grid-2" style={{marginBottom:'20px'}}>
        <div className="card">
          <div className="card-title">Top Users by Deposits</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={[...enriched].sort((a,b)=>b.totalDeposit-a.totalDeposit).slice(0,5)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis type="number" tick={{fontSize:11}} tickFormatter={v=>'Rs.'+v.toLocaleString()}/>
              <YAxis type="category" dataKey="username" tick={{fontSize:12}} width={70}/>
              <Tooltip formatter={v=>['Rs.'+v.toLocaleString(),'Deposit']}/>
              <Bar dataKey="totalDeposit" fill="#3a7bd5" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">Top Users by Contests</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={topContest} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis type="number" tick={{fontSize:11}}/>
              <YAxis type="category" dataKey="username" tick={{fontSize:12}} width={70}/>
              <Tooltip/>
              <Bar dataKey="contests" fill="#6f42c1" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Unique ID</th><th>Username</th><th>Name</th><th>Email</th><th>Phone</th>
              <th>Registration Date</th><th>User Deposited</th><th>Admin Deposited</th>
              <th>Total Withdrawal</th><th>Winning Balance</th>
            </tr></thead>
            <tbody>
              {filtered.map(u=>(
                <tr key={u.id}>
                  <td style={{fontFamily:'monospace',fontSize:'12px',color:'var(--primary)'}}>{u.id}</td>
                  <td><strong>{u.username}</strong></td>
                  <td>{u.fullName}</td>
                  <td style={{fontSize:'12px'}}>{u.email}</td>
                  <td style={{fontSize:'12px'}}>{u.phone}</td>
                  <td style={{fontSize:'12px'}}>{u.registrationDate}</td>
                  <td style={{fontWeight:600}}>Rs.{u.totalDeposit.toLocaleString()}</td>
                  <td>Rs.{u.adminDeposited.toFixed(2)}</td>
                  <td style={{color:'var(--danger)'}}>Rs.{u.totalWithdrawal.toFixed(2)}</td>
                  <td style={{fontWeight:600,color:'var(--success)'}}>Rs.{u.winningBalance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span style={{fontSize:'13px',color:'var(--text-muted)'}}>Showing {filtered.length} records</span>
          <div className="pagination">{[1,2,3].map(p=><div key={p} className={`page-btn ${p===1?'active':''}`}>{p}</div>)}</div>
        </div>
      </div>
    </Layout>
  );
}
