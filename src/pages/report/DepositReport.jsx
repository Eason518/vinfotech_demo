import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Search, DollarSign, TrendingUp, Calendar, Hash } from 'lucide-react';
import Layout from '../../components/Layout';
import { depositReports } from '../../data/mockData';

const monthlyData = [
  { month: 'Oct', amount: 380000 }, { month: 'Nov', amount: 510000 },
  { month: 'Dec', amount: 620000 }, { month: 'Jan', amount: 490000 },
  { month: 'Feb', amount: 580000 }, { month: 'Mar', amount: 667650 },
];

export default function DepositReport() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ col: 'totalDepositAmount', dir: 'desc' });
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-03-31');

  const filtered = [...depositReports]
    .filter(u => !search || u.username.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sort.dir === 'desc' ? b[sort.col]-a[sort.col] : a[sort.col]-b[sort.col]);

  const toggleSort = (col) => setSort(s => ({ col, dir: s.col===col && s.dir==='desc'?'asc':'desc' }));
  const sortIcon = (col) => sort.col===col?(sort.dir==='desc'?' ↓':' ↑'):' ↕';

  const totalAmount = depositReports.reduce((s,u)=>s+u.totalDepositAmount,0);
  const totalCount = depositReports.reduce((s,u)=>s+u.depositCount,0);
  const avgDeposit = totalAmount / totalCount;

  return (
    <Layout title="User Deposit Amount">
      <div className="page-header">
        <p className="breadcrumb">Home / Report / <span>User Deposit Amount</span></p>
        <div className="flex justify-between items-center">
          <h1>User Deposit Amount Report</h1>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export CSV</button>
        </div>
      </div>

      <div className="stats-grid" style={{marginBottom:'20px'}}>
        {[[DollarSign,'Total Deposits','Rs.'+totalAmount.toLocaleString(),'#28a745'],[Hash,'Total Transactions',totalCount,'#3a7bd5'],[TrendingUp,'Avg. Deposit per Tx','Rs.'+avgDeposit.toFixed(0),'#6f42c1'],[Calendar,'Report Period','Oct 23 – Mar 24','#fd7e14']].map(([Icon,l,v,c])=>(
          <div key={l} className="stat-card">
            <div style={{background:c+'18',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><Icon size={20} color={c} /></div>
            <div className="s-label">{l}</div>
            <div className="s-value" style={{fontSize:'18px',color:c}}>{v}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{marginBottom:'20px'}}>
        <div className="card-title">Monthly Deposit Trend</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="dep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#28a745" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#28a745" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{fontSize:12}} />
            <YAxis tick={{fontSize:11}} tickFormatter={v=>'Rs.'+Math.round(v/1000)+'K'} />
            <Tooltip formatter={v=>['Rs.'+v.toLocaleString(),'Deposits']} />
            <Area type="monotone" dataKey="amount" stroke="#28a745" fill="url(#dep)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="flex justify-between items-center" style={{marginBottom:'16px'}}>
          <div className="card-title" style={{marginBottom:0}}>Deposit Details by User</div>
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
              <th>User ID</th><th>Username</th><th>Full Name</th>
              <th style={{cursor:'pointer'}} onClick={()=>toggleSort('totalDepositAmount')}>Total Amount{sortIcon('totalDepositAmount')}</th>
              <th style={{cursor:'pointer'}} onClick={()=>toggleSort('depositCount')}>Tx Count{sortIcon('depositCount')}</th>
              <th style={{cursor:'pointer'}} onClick={()=>toggleSort('avgDeposit')}>Avg. Deposit{sortIcon('avgDeposit')}</th>
              <th>Last Deposit</th>
              <th>Deposit Share</th>
            </tr></thead>
            <tbody>
              {filtered.map(u => {
                const share = ((u.totalDepositAmount / totalAmount) * 100).toFixed(1);
                return (
                  <tr key={u.userId}>
                    <td style={{fontFamily:'monospace',fontSize:'12px',color:'var(--primary)'}}>{u.userId}</td>
                    <td><strong>{u.username}</strong></td>
                    <td>{u.fullName}</td>
                    <td style={{fontWeight:700,color:'var(--primary)',fontSize:'15px'}}>Rs.{u.totalDepositAmount.toLocaleString()}</td>
                    <td style={{textAlign:'center',fontWeight:600}}>{u.depositCount}</td>
                    <td>Rs.{u.avgDeposit.toFixed(2)}</td>
                    <td style={{color:'var(--text-muted)',fontSize:'13px'}}>{u.lastDeposit}</td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <div style={{flex:1,background:'#f0f2f4',borderRadius:'4px',height:'6px',minWidth:'60px'}}>
                          <div style={{background:'var(--success)',height:'100%',borderRadius:'4px',width:share+'%'}}></div>
                        </div>
                        <span style={{fontSize:'12px',fontWeight:600,minWidth:'32px'}}>{share}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
