import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Search, TrendingUp, Users, Trophy, GitBranch } from 'lucide-react';
import Layout from '../../components/Layout';
import { userReports } from '../../data/mockData';

const topContest = [
  { username: 'vijay_r', contests: 134 }, { username: 'priya_s', contests: 82 },
  { username: 'arjun_b', contests: 96 }, { username: 'rahul_k', contests: 47 }, { username: 'rakesh_t', contests: 31 },
];

export default function UserReport() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ col: 'totalDeposit', dir: 'desc' });
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-03-31');

  const filtered = [...userReports]
    .filter(u => !search || u.username.toLowerCase().includes(search.toLowerCase()) || u.fullName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort.dir === 'desc' ? b[sort.col] - a[sort.col] : a[sort.col] - b[sort.col]);

  const toggleSort = (col) => setSort(s => ({ col, dir: s.col === col && s.dir === 'desc' ? 'asc' : 'desc' }));
  const sortIcon = (col) => sort.col === col ? (sort.dir === 'desc' ? ' ↓' : ' ↑') : ' ↕';

  const totalDeposits = userReports.reduce((s, u) => s + u.totalDeposit, 0);
  const totalWinnings = userReports.reduce((s, u) => s + u.totalWinnings, 0);
  const totalContests = userReports.reduce((s, u) => s + u.totalContests, 0);
  const totalReferrals = userReports.reduce((s, u) => s + u.referrals, 0);

  return (
    <Layout title="User Report">
      <div className="page-header">
        <p className="breadcrumb">Home / Report / <span>User Report</span></p>
        <div className="flex justify-between items-center">
          <h1>User Report</h1>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export CSV</button>
        </div>
      </div>

      <div className="stats-grid" style={{marginBottom:'20px'}}>
        {[[Users,'Total Users in Report',userReports.length,'#3a7bd5'],[TrendingUp,'Total Deposits','Rs.'+totalDeposits.toLocaleString(),'#28a745'],[Trophy,'Total Winnings','Rs.'+totalWinnings.toLocaleString(),'#6f42c1'],[GitBranch,'Total Referrals',totalReferrals,'#fd7e14']].map(([Icon,l,v,c])=>(
          <div key={l} className="stat-card">
            <div style={{background:c+'18',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><Icon size={20} color={c} /></div>
            <div className="s-label">{l}</div>
            <div className="s-value" style={{fontSize:'20px',color:c}}>{typeof v==='number'?v.toLocaleString():v}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{marginBottom:'20px'}}>
        <div className="card">
          <div className="card-title">Top Users by Deposits</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={userReports.sort((a,b)=>b.totalDeposit-a.totalDeposit).slice(0,5)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{fontSize:11}} tickFormatter={v=>'Rs.'+v.toLocaleString()} />
              <YAxis type="category" dataKey="username" tick={{fontSize:12}} width={70} />
              <Tooltip formatter={v=>['Rs.'+v.toLocaleString(),'Deposit']} />
              <Bar dataKey="totalDeposit" fill="#3a7bd5" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">Top Users by Contests Played</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topContest} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{fontSize:11}} />
              <YAxis type="category" dataKey="username" tick={{fontSize:12}} width={70} />
              <Tooltip />
              <Bar dataKey="contests" fill="#6f42c1" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center" style={{marginBottom:'16px'}}>
          <div className="card-title" style={{marginBottom:0}}>User Details</div>
          <div className="flex gap-2 items-center">
            <input type="date" className="form-control" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={{width:'145px'}} />
            <span style={{color:'var(--text-muted)'}}>to</span>
            <input type="date" className="form-control" value={dateTo} onChange={e=>setDateTo(e.target.value)} style={{width:'145px'}} />
            <div style={{position:'relative'}}>
              <Search size={13} style={{position:'absolute',left:'9px',top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}} />
              <input className="form-control" style={{paddingLeft:'30px',width:'200px'}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>User ID</th><th>Username</th><th>Full Name</th><th>City</th>
              <th style={{cursor:'pointer'}} onClick={()=>toggleSort('totalContests')}>Contests{sortIcon('totalContests')}</th>
              <th style={{cursor:'pointer'}} onClick={()=>toggleSort('totalDeposit')}>Total Deposit{sortIcon('totalDeposit')}</th>
              <th style={{cursor:'pointer'}} onClick={()=>toggleSort('totalWinnings')}>Total Winnings{sortIcon('totalWinnings')}</th>
              <th style={{cursor:'pointer'}} onClick={()=>toggleSort('referrals')}>Referrals{sortIcon('referrals')}</th>
              <th>P&L</th>
            </tr></thead>
            <tbody>
              {filtered.map(u => {
                const pl = u.totalWinnings - u.totalDeposit;
                return (
                  <tr key={u.id}>
                    <td style={{fontFamily:'monospace',fontSize:'12px',color:'var(--primary)'}}>{u.id}</td>
                    <td><strong>{u.username}</strong></td>
                    <td>{u.fullName}</td>
                    <td>{u.city}</td>
                    <td style={{textAlign:'center',fontWeight:600}}>{u.totalContests}</td>
                    <td style={{fontWeight:600}}>Rs.{u.totalDeposit.toLocaleString()}</td>
                    <td style={{fontWeight:600,color:'var(--success)'}}>Rs.{u.totalWinnings.toLocaleString()}</td>
                    <td style={{textAlign:'center'}}>{u.referrals}</td>
                    <td style={{fontWeight:700,color:pl>=0?'var(--success)':'var(--danger)'}}>
                      {pl>=0?'+':''}Rs.{Math.abs(pl).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span style={{fontSize:'13px',color:'var(--text-muted)'}}>Showing {filtered.length} records</span>
          <div className="pagination">{[1,2,3,4,5].map(p=><div key={p} className={`page-btn ${p===1?'active':''}`}>{p}</div>)}</div>
        </div>
      </div>
    </Layout>
  );
}
