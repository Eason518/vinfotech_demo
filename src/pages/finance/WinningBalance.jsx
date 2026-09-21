import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, Search, Trophy, Users, DollarSign, TrendingUp } from 'lucide-react';
import Layout from '../../components/Layout';
import { winningBalances } from '../../data/mockData';

const COLORS = ['#3a7bd5','#28a745','#ffc107','#dc3545','#6f42c1'];
const ranges = [
  { name: '0–1K', count: 0 }, { name: '1K–3K', count: 0 },
  { name: '3K–6K', count: 0 }, { name: '6K–10K', count: 0 }, { name: '10K+', count: 0 },
];

export default function WinningBalance() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ col:'winningBalance', dir:'desc' });

  const total = winningBalances.reduce((s,w) => s + w.winningBalance, 0);
  const avg = total / winningBalances.length;
  const max = Math.max(...winningBalances.map(w=>w.winningBalance));

  const distribution = [...ranges];
  winningBalances.forEach(w => {
    if (w.winningBalance < 1000) distribution[0].count++;
    else if (w.winningBalance < 3000) distribution[1].count++;
    else if (w.winningBalance < 6000) distribution[2].count++;
    else if (w.winningBalance < 10000) distribution[3].count++;
    else distribution[4].count++;
  });
  const pieData = distribution.filter(d=>d.count>0);

  const filtered = [...winningBalances]
    .filter(w => !search || w.username.toLowerCase().includes(search.toLowerCase()) || w.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sort.dir==='desc' ? b[sort.col]-a[sort.col] : a[sort.col]-b[sort.col]);

  const toggleSort = (col) => setSort(s => ({ col, dir: s.col===col && s.dir==='desc'?'asc':'desc' }));

  return (
    <Layout title="Winning Balance">
      <div className="page-header">
        <p className="breadcrumb">Home / Manage Finance / <span>Winning Balance</span></p>
        <div className="flex justify-between items-center">
          <h1>Winning Balance Report</h1>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export</button>
        </div>
      </div>

      <div className="stats-grid" style={{marginBottom:'20px',gridTemplateColumns:'repeat(4,1fr)'}}>
        {[[Trophy,'Total Winning Balance','Rs.'+total.toLocaleString('en-IN',{maximumFractionDigits:0}),'#28a745'],[Users,'Users with Winnings',winningBalances.length,'#3a7bd5'],[DollarSign,'Average Balance','Rs.'+avg.toFixed(0),'#6f42c1'],[TrendingUp,'Highest Balance','Rs.'+max.toLocaleString(),'#fd7e14']].map(([Icon,l,v,c])=>(
          <div key={l} className="stat-card">
            <div style={{background:c+'18',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><Icon size={20} color={c}/></div>
            <div className="s-label">{l}</div>
            <div className="s-value" style={{fontSize:'20px',color:c}}>{v}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{marginBottom:'20px'}}>
        <div className="card" style={{textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'32px'}}>
          <div style={{fontSize:'13px',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px'}}>Total Winning Balance</div>
          <div style={{fontSize:'52px',fontWeight:'900',color:'var(--primary)',lineHeight:1}}>Rs.{total.toLocaleString('en-IN',{maximumFractionDigits:0})}</div>
          <div style={{fontSize:'13px',color:'var(--text-muted)',marginTop:'8px'}}>Across {winningBalances.length} users</div>
        </div>
        <div className="card">
          <div className="card-title">Balance Distribution</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} innerRadius={30} dataKey="count" nameKey="name">
                {pieData.map((_,i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v,n)=>[v+' users', n]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center" style={{marginBottom:'16px'}}>
          <div className="card-title" style={{marginBottom:0}}>User Winning Balances</div>
          <div style={{position:'relative'}}>
            <Search size={13} style={{position:'absolute',left:'9px',top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}} />
            <input className="form-control" style={{paddingLeft:'30px',width:'240px'}} placeholder="Search username or email..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Rank</th><th>Unique ID</th><th>Username</th><th>Full Name</th><th>Email</th><th>Mobile</th>
              <th style={{cursor:'pointer'}} onClick={()=>toggleSort('winningBalance')}>Winning Balance {sort.col==='winningBalance'?(sort.dir==='desc'?'↓':'↑'):'↕'}</th>
              <th>Share</th>
            </tr></thead>
            <tbody>
              {filtered.map((w,i) => {
                const share = ((w.winningBalance/total)*100).toFixed(1);
                return (
                  <tr key={w.id} style={{background:i===0?'#fff9e6':i===1?'#f8f8f8':i===2?'#fff4ee':'transparent'}}>
                    <td style={{fontWeight:700,fontSize:'16px',textAlign:'center'}}>
                      {i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${i+1}`}
                    </td>
                    <td style={{fontFamily:'monospace',fontSize:'12px',color:'var(--primary)'}}>{w.id}</td>
                    <td><strong>{w.username}</strong></td>
                    <td>{w.fullName}</td>
                    <td style={{fontSize:'12px'}}>{w.email}</td>
                    <td style={{fontSize:'12px'}}>{w.mobile}</td>
                    <td style={{fontWeight:800,color:'var(--success)',fontSize:'16px'}}>Rs.{w.winningBalance.toLocaleString()}</td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <div style={{flex:1,background:'#f0f2f4',borderRadius:'4px',height:'6px',minWidth:'60px'}}>
                          <div style={{background:'var(--success)',height:'100%',borderRadius:'4px',width:share+'%'}}></div>
                        </div>
                        <span style={{fontSize:'12px',fontWeight:600}}>{share}%</span>
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
