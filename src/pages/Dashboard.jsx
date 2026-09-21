import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, TrendingUp, DollarSign, ArrowDownCircle, Trophy, Clock, UserPlus, Inbox } from 'lucide-react';
import Layout from '../components/Layout';
import { dashboardStats, chartData } from '../data/mockData';

const COLORS = ['#3a7bd5', '#28a745', '#ffc107', '#dc3545'];

const TABS = ['Overview', 'User Analytics', 'User Behaviour', 'Marketing', 'Trending Events', 'Referrals', 'Leaderboards Platform'];

function StatCard({ label, value, change, icon: Icon, color, bg }) {
  return (
    <div className="stat-card">
      <div className="flex justify-between items-center" style={{marginBottom:'12px'}}>
        <div style={{background: bg||color+'18', borderRadius:'10px', padding:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Icon size={22} color={color} />
        </div>
        {change && <span className={`s-change ${change.startsWith('+') ? 'up' : 'down'}`} style={{fontSize:'12px', fontWeight:600}}>{change}</span>}
      </div>
      <div className="s-label">{label}</div>
      <div className="s-value" style={{fontSize:'22px', marginTop:'4px'}}>{value}</div>
    </div>
  );
}

const leaderboardData = [
  { rank:1, username:'vijay_r', fullName:'Vijay Reddy', contest:'IPL Mega Grand League', points:2841, winnings:'Rs.1,50,000', wins:34 },
  { rank:2, username:'arjun_b', fullName:'Arjun Bose', contest:'IPL Mega Grand League', points:2690, winnings:'Rs.75,000', wins:28 },
  { rank:3, username:'priya_s', fullName:'Priya Sharma', contest:'IPL Mega Grand League', points:2580, winnings:'Rs.50,000', wins:22 },
  { rank:4, username:'rahul_k', fullName:'Rahul Kumar', contest:'IPL Mega Grand League', points:2410, winnings:'Rs.25,000', wins:19 },
  { rank:5, username:'rakesh_t', fullName:'Rakesh Tiwari', contest:'IPL Mega Grand League', points:2280, winnings:'Rs.15,000', wins:15 },
  { rank:6, username:'anita_g', fullName:'Anita Gupta', contest:'IPL Mega Grand League', points:2100, winnings:'Rs.10,000', wins:12 },
  { rank:7, username:'pooja_n', fullName:'Pooja Nair', contest:'IPL Mega Grand League', points:1950, winnings:'Rs.5,000', wins:9 },
  { rank:8, username:'kavita_d', fullName:'Kavita Desai', contest:'IPL Mega Grand League', points:1820, winnings:'Rs.3,000', wins:7 },
  { rank:9, username:'amit_p', fullName:'Amit Patel', contest:'IPL Mega Grand League', points:1710, winnings:'Rs.2,000', wins:5 },
  { rank:10, username:'sneha_m', fullName:'Sneha Mehta', contest:'IPL Mega Grand League', points:1600, winnings:'Rs.1,000', wins:4 },
];

const rankBadge = (r) => r===1 ? '🥇' : r===2 ? '🥈' : r===3 ? '🥉' : `#${r}`;

export default function Dashboard() {
  const [tab, setTab] = useState('Overview');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-03-31');
  const [contestFilter, setContestFilter] = useState('IPL Mega Grand League');
  const s = dashboardStats;

  return (
    <Layout title="Dashboard">
      <div className="page-header">
        <div className="flex justify-between items-center">
          <div>
            <p className="breadcrumb">Home / <span>Dashboard</span></p>
            <h1>Dashboard Overview</h1>
          </div>
          <div className="flex gap-2 items-center">
            <input type="date" className="form-control" style={{width:'145px'}} value={dateFrom} onChange={e=>setDateFrom(e.target.value)} />
            <span style={{color:'var(--text-muted)'}}>to</span>
            <input type="date" className="form-control" style={{width:'145px'}} value={dateTo} onChange={e=>setDateTo(e.target.value)} />
            <button className="btn btn-primary btn-sm">Apply</button>
          </div>
        </div>
      </div>

      <div className="tabs">
        {TABS.map(t => <div key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</div>)}
      </div>

      {tab === 'Overview' && (
        <>
          <div className="stats-grid">
            <StatCard label="Total Users" value={s.totalUsers.toLocaleString()} change="+18.2%" icon={Users} color="#3a7bd5" />
            <StatCard label="Active Users" value={s.activeUsers.toLocaleString()} change="+12.1%" icon={TrendingUp} color="#28a745" />
            <StatCard label="Total Deposits" value={'Rs.'+s.totalDeposits.toLocaleString()} change="+23.4%" icon={DollarSign} color="#fd7e14" />
            <StatCard label="Total Withdrawals" value={'Rs.'+s.totalWithdrawals.toLocaleString()} change="+15.7%" icon={ArrowDownCircle} color="#dc3545" />
            <StatCard label="Total Contests" value={s.totalContests.toLocaleString()} change="+8.9%" icon={Trophy} color="#6f42c1" />
            <StatCard label="Pending Withdrawals" value={s.pendingWithdrawals} icon={Clock} color="#ffc107" />
            <StatCard label="New Users Today" value={s.todayNewUsers} icon={UserPlus} color="#17a2b8" />
            <StatCard label="Today Deposits" value={'Rs.'+s.todayDeposits.toLocaleString()} icon={Inbox} color="#20c997" />
          </div>

          <div className="grid-2 mt-4">
            <div className="card">
              <div className="card-title">User Growth (6 Months)</div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData.userGrowth}>
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3a7bd5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3a7bd5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{fontSize:12}} />
                  <YAxis tick={{fontSize:12}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="#3a7bd5" fill="url(#ug)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="card-title">Deposits vs Withdrawals (INR)</div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData.depositVsWithdrawal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{fontSize:12}} />
                  <YAxis tick={{fontSize:12}} />
                  <Tooltip formatter={v=>'Rs.'+v.toLocaleString()} />
                  <Legend />
                  <Bar dataKey="deposits" name="Deposits" fill="#3a7bd5" radius={[4,4,0,0]} />
                  <Bar dataKey="withdrawals" name="Withdrawals" fill="#dc3545" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid-2 mt-4">
            <div className="card">
              <div className="card-title">Game Distribution</div>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={chartData.gameDistribution} cx="50%" cy="50%" outerRadius={90} innerRadius={40} dataKey="value" label={({name,value})=>`${name} ${value}%`} labelLine={false}>
                    {chartData.gameDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="card-title">Today's Key Metrics</div>
              {[
                ["New Registrations","148","#3a7bd5"],
                ["KYC Submissions","32","#28a745"],
                ["Contests Created","24","#6f42c1"],
                ["Total Deposits","Rs.84,320","#fd7e14"],
                ["Withdrawal Requests","12","#dc3545"],
                ["Active Sessions","3,841","#17a2b8"],
                ["Support Tickets","7","#ffc107"],
              ].map(([k,v,c]) => (
                <div key={k} className="flex justify-between items-center" style={{padding:'9px 0',borderBottom:'1px solid #f5f5f5'}}>
                  <span style={{color:'var(--text-muted)',fontSize:'13px'}}>{k}</span>
                  <span style={{fontWeight:700,color:c,fontSize:'14px'}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'User Analytics' && (
        <div className="card">
          <div className="card-title">User Analytics</div>
          <div className="stats-grid" style={{marginBottom:'24px'}}>
            <StatCard label="New Users (Month)" value="4,821" change="+18.2%" icon={UserPlus} color="#3a7bd5" />
            <StatCard label="Verified Users" value="38,491" icon={Users} color="#28a745" />
            <StatCard label="Pending KYC" value="2,341" icon={Clock} color="#ffc107" />
            <StatCard label="Blocked Users" value="128" icon={Users} color="#dc3545" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData.userGrowth}>
              <defs><linearGradient id="ug2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3a7bd5" stopOpacity={0.2}/><stop offset="95%" stopColor="#3a7bd5" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" /><YAxis />
              <Tooltip /><Legend />
              <Area type="monotone" dataKey="users" stroke="#3a7bd5" fill="url(#ug2)" name="Total Users" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === 'User Behaviour' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Session Statistics</div>
            {[['Avg. Session Duration','8m 24s'],['Pages per Session','6.2'],['Bounce Rate','24.3%'],['Return Visitor Rate','68%'],['Mobile Users','74%'],['Desktop Users','26%']].map(([k,v]) => (
              <div key={k} className="flex justify-between items-center" style={{padding:'12px 0',borderBottom:'1px solid #f5f5f5'}}>
                <span style={{color:'var(--text-muted)'}}>{k}</span>
                <span style={{fontWeight:700}}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">Feature Usage</div>
            {[['Create Contest',68],['Join Contest',54],['Leaderboard',38],['Wallet / Deposit',24],['Profile & KYC',14],['Referral',8]].map(([k,v]) => (
              <div key={k} style={{marginBottom:'14px'}}>
                <div className="flex justify-between" style={{marginBottom:'5px'}}>
                  <span style={{fontSize:'13px'}}>{k}</span>
                  <span style={{fontSize:'13px',fontWeight:700,color:'var(--primary)'}}>{v}%</span>
                </div>
                <div style={{background:'#f0f2f4',borderRadius:'4px',height:'7px'}}>
                  <div style={{background:'var(--primary)',height:'100%',borderRadius:'4px',width:v+'%',transition:'width 0.4s'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Marketing' && (
        <div className="card">
          <div className="card-title">Marketing Analytics</div>
          <div className="stats-grid" style={{marginBottom:'24px'}}>
            <StatCard label="Active Promo Codes" value="3" icon={Trophy} color="#3a7bd5" />
            <StatCard label="Promo Redemptions" value="446" change="+32%" icon={TrendingUp} color="#28a745" />
            <StatCard label="Bonus Awarded" value="Rs.82,400" icon={DollarSign} color="#6f42c1" />
            <StatCard label="Referrals This Month" value="284" change="+12%" icon={Users} color="#fd7e14" />
          </div>
          <table><thead><tr><th>Promo Code</th><th>Used</th><th>Limit</th><th>Utilisation</th><th>Revenue Impact</th></tr></thead>
          <tbody>
            {[['WELCOME50',234,1000,'23.4%','Rs.14,400'],['FLAT100',89,500,'17.8%','Rs.8,900'],['NEWUSER',123,9999,'1.2%','Rs.6,150']].map(([c,u,l,p,r]) => (
              <tr key={c}><td><code style={{background:'#f0f2f4',padding:'2px 8px',borderRadius:'4px'}}>{c}</code></td><td>{u}</td><td>{l}</td>
                <td><div style={{display:'flex',alignItems:'center',gap:'8px'}}><div style={{flex:1,background:'#f0f2f4',borderRadius:'4px',height:'6px'}}><div style={{background:'var(--primary)',height:'100%',borderRadius:'4px',width:p}}></div></div><span style={{fontSize:'12px'}}>{p}</span></div></td>
                <td style={{fontWeight:600,color:'var(--success)'}}>{r}</td>
              </tr>
            ))}
          </tbody></table>
        </div>
      )}

      {tab === 'Trending Events' && (
        <div className="card">
          <div className="card-title">Trending Events</div>
          <div className="table-wrapper"><table><thead><tr><th>Event</th><th>Game</th><th>Contests</th><th>Participants</th><th>Prize Pool</th><th>Status</th></tr></thead>
          <tbody>
            {[['IPL 2024 - MI vs CSK','Cricket',48,12841,'Rs.10,00,000','Live'],['IPL 2024 - RCB vs KKR','Cricket',36,9432,'Rs.5,00,000','Upcoming'],['EPL Gameweek 30','Football',12,2341,'Rs.1,00,000','Live'],['PKL Season 11 Finals','Kabaddi',8,1204,'Rs.50,000','Upcoming'],['ICC World Cup','Cricket',24,18400,'Rs.25,00,000','Upcoming']].map(([ev,gm,co,pa,pp,st]) => (
              <tr key={ev}><td style={{fontWeight:500}}>{ev}</td><td>{gm}</td><td>{co}</td><td>{pa.toLocaleString()}</td><td style={{fontWeight:600}}>{pp}</td>
                <td><span className={`badge ${st==='Live'?'badge-success':'badge-primary'}`}>{st}</span></td>
              </tr>
            ))}
          </tbody></table></div>
        </div>
      )}

      {tab === 'Referrals' && (
        <div className="card">
          <div className="card-title">Referral Program</div>
          <div className="stats-grid" style={{marginBottom:'24px'}}>
            <StatCard label="Total Referrals" value="2,841" change="+22%" icon={Users} color="#3a7bd5" />
            <StatCard label="Successful" value="1,923" icon={TrendingUp} color="#28a745" />
            <StatCard label="Bonus Paid" value="Rs.96,150" icon={DollarSign} color="#fd7e14" />
            <StatCard label="Top Referrer" value="vijay_r (22)" icon={Trophy} color="#6f42c1" />
          </div>
          <div className="table-wrapper"><table><thead><tr><th>Rank</th><th>Username</th><th>Full Name</th><th>Referrals</th><th>Bonus Earned</th></tr></thead>
          <tbody>
            {[['1','vijay_r','Vijay Reddy',22,'Rs.1,100'],['2','priya_s','Priya Sharma',15,'Rs.750'],['3','arjun_b','Arjun Bose',11,'Rs.550'],['4','rahul_k','Rahul Kumar',8,'Rs.400'],['5','anita_g','Anita Gupta',6,'Rs.300']].map(([r,u,fn,ref,b]) => (
              <tr key={r}><td style={{fontWeight:700,fontSize:'15px'}}>{rankBadge(+r)}</td><td><strong>{u}</strong></td><td>{fn}</td><td>{ref}</td><td style={{fontWeight:700,color:'var(--success)'}}>{b}</td></tr>
            ))}
          </tbody></table></div>
        </div>
      )}

      {tab === 'Leaderboards Platform' && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <div className="card-title" style={{marginBottom:0}}>Leaderboards Platform</div>
            <div className="flex gap-2 items-center">
              <select className="form-control" style={{width:'260px'}} value={contestFilter} onChange={e=>setContestFilter(e.target.value)}>
                <option>IPL Mega Grand League</option>
                <option>IPL Head-to-Head</option>
                <option>EPL Fantasy League</option>
                <option>PKL Season 11</option>
              </select>
              <button className="btn btn-outline btn-sm">Export</button>
            </div>
          </div>

          <div className="stats-grid" style={{marginBottom:'20px'}}>
            <div className="stat-card"><div className="s-label">Total Participants</div><div className="s-value">48,293</div></div>
            <div className="stat-card"><div className="s-label">Total Contests</div><div className="s-value">1,847</div></div>
            <div className="stat-card"><div className="s-label">Prize Pool</div><div className="s-value" style={{color:'var(--success)'}}>Rs.10L</div></div>
            <div className="stat-card"><div className="s-label">Avg. Points/User</div><div className="s-value">1,284</div></div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Contest</th>
                  <th style={{textAlign:'right'}}>Points</th>
                  <th style={{textAlign:'right'}}>Winnings</th>
                  <th style={{textAlign:'center'}}>Total Wins</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map(row => (
                  <tr key={row.rank} style={{background: row.rank<=3 ? row.rank===1?'#fff9e6':row.rank===2?'#f8f8f8':row.rank===3?'#fff4ee':'transparent' : 'transparent'}}>
                    <td style={{fontWeight:700, fontSize:'18px', textAlign:'center'}}>{rankBadge(row.rank)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#3a7bd5,#6f42c1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'12px',flexShrink:0}}>
                          {row.username[0].toUpperCase()}
                        </div>
                        <strong>{row.username}</strong>
                      </div>
                    </td>
                    <td>{row.fullName}</td>
                    <td style={{fontSize:'12px', color:'var(--text-muted)'}}>{row.contest}</td>
                    <td style={{textAlign:'right', fontWeight:700, fontSize:'15px', color:'var(--primary)'}}>{row.points.toLocaleString()}</td>
                    <td style={{textAlign:'right', fontWeight:700, color:'var(--success)'}}>{row.winnings}</td>
                    <td style={{textAlign:'center'}}><span className="badge badge-info">{row.wins}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination" style={{marginTop:'16px'}}>
            {[1,2,3,4,5].map(p=><div key={p} className={`page-btn ${p===1?'active':''}`}>{p}</div>)}
            <div className="page-btn">›</div>
          </div>
        </div>
      )}
    </Layout>
  );
}
