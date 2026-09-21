import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout';
import { dashboardStats, chartData } from '../data/mockData';

const COLORS = ['#3a7bd5', '#28a745', '#ffc107', '#dc3545'];
const tabs = ['Overview', 'User Analytics', 'User Behaviour', 'Marketing', 'Trending Events', 'Referrals'];

function StatCard({ label, value, change, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{background: color+'22'}}><span style={{fontSize:'20px'}}>{icon}</span></div>
      <div className="s-label">{label}</div>
      <div className="s-value">{value}</div>
      {change && <div className={`s-change ${change.startsWith('+') ? 'up' : 'down'}`}>{change} vs last month</div>}
    </div>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState('Overview');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-03-31');
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
            <input type="date" className="form-control" style={{width:'150px'}} value={dateFrom} onChange={e=>setDateFrom(e.target.value)} />
            <span style={{color:'var(--text-muted)'}}>to</span>
            <input type="date" className="form-control" style={{width:'150px'}} value={dateTo} onChange={e=>setDateTo(e.target.value)} />
            <button className="btn btn-primary btn-sm">Apply</button>
          </div>
        </div>
      </div>

      <div className="tabs">
        {tabs.map(t => <div key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</div>)}
      </div>

      {tab === 'Overview' && (
        <>
          <div className="stats-grid">
            <StatCard label="Total Users" value={s.totalUsers.toLocaleString()} change="+18.2%" icon="👥" color="#3a7bd5" />
            <StatCard label="Active Users" value={s.activeUsers.toLocaleString()} change="+12.1%" icon="✅" color="#28a745" />
            <StatCard label="Total Deposits (INR)" value={"Rs."+s.totalDeposits.toLocaleString()} change="+23.4%" icon="💵" color="#fd7e14" />
            <StatCard label="Total Withdrawals (INR)" value={"Rs."+s.totalWithdrawals.toLocaleString()} change="+15.7%" icon="💸" color="#dc3545" />
            <StatCard label="Total Contests" value={s.totalContests.toLocaleString()} change="+8.9%" icon="🏆" color="#6f42c1" />
            <StatCard label="Pending Withdrawals" value={s.pendingWithdrawals} icon="⏳" color="#ffc107" />
            <StatCard label="Today New Users" value={s.todayNewUsers} icon="🆕" color="#17a2b8" />
            <StatCard label="Today Deposits (INR)" value={"Rs."+s.todayDeposits.toLocaleString()} icon="📥" color="#20c997" />
          </div>

          <div className="grid-2 mt-4">
            <div className="card">
              <div className="card-title">User Growth</div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{fontSize:12}} />
                  <YAxis tick={{fontSize:12}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3a7bd5" strokeWidth={2} dot={{r:4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="card-title">Deposits vs Withdrawals (INR)</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData.depositVsWithdrawal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{fontSize:12}} />
                  <YAxis tick={{fontSize:12}} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deposits" fill="#3a7bd5" radius={[4,4,0,0]} />
                  <Bar dataKey="withdrawals" fill="#dc3545" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid-2 mt-4">
            <div className="card">
              <div className="card-title">Game Distribution (%)</div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={chartData.gameDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name,value})=>`${name} ${value}%`}>
                    {chartData.gameDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="card-title">Today's Key Metrics</div>
              <table>
                <tbody>
                  {[
                    ['New Registrations', '148'],
                    ['KYC Submissions', '32'],
                    ['Contests Created', '24'],
                    ['Total Deposits', 'Rs.84,320'],
                    ['Withdrawal Requests', '12'],
                    ['Active Sessions', '3,841'],
                    ['Support Tickets', '7'],
                  ].map(([k,v]) => (
                    <tr key={k}>
                      <td style={{color:'var(--text-muted)'}}>{k}</td>
                      <td style={{fontWeight:600, textAlign:'right'}}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'User Analytics' && (
        <div className="card">
          <div className="card-title">User Analytics</div>
          <div className="stats-grid" style={{marginBottom:'20px'}}>
            <StatCard label="New Users (This Month)" value="4,821" change="+18.2%" icon="👤" color="#3a7bd5" />
            <StatCard label="Verified Users" value="38,491" icon="✅" color="#28a745" />
            <StatCard label="Pending KYC" value="2,341" icon="⏳" color="#ffc107" />
            <StatCard label="Blocked Users" value="128" icon="🚫" color="#dc3545" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3a7bd5" strokeWidth={2} name="Total Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === 'User Behaviour' && (
        <div className="card">
          <div className="card-title">User Behaviour Insights</div>
          <div className="grid-2">
            <div>
              <h4 style={{marginBottom:'12px', fontWeight:600}}>Session Stats</h4>
              {[['Avg. Session Duration','8m 24s'],['Pages per Session','6.2'],['Bounce Rate','24.3%'],['Return Visitors','68%']].map(([k,v]) => (
                <div key={k} className="flex justify-between items-center" style={{padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                  <span style={{color:'var(--text-muted)'}}>{k}</span>
                  <span style={{fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{marginBottom:'12px', fontWeight:600}}>Top Features Used</h4>
              {[['Create Contest','34%'],['Join Contest','28%'],['Leaderboard','18%'],['Wallet','12%'],['Profile','8%']].map(([k,v]) => (
                <div key={k} style={{marginBottom:'10px'}}>
                  <div className="flex justify-between" style={{marginBottom:'4px'}}>
                    <span style={{fontSize:'13px'}}>{k}</span><span style={{fontSize:'13px',fontWeight:600}}>{v}</span>
                  </div>
                  <div style={{background:'#f0f2f4',borderRadius:'4px',height:'6px'}}>
                    <div style={{background:'var(--primary)',height:'100%',borderRadius:'4px',width:v}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Marketing' && (
        <div className="card">
          <div className="card-title">Marketing Analytics</div>
          <div className="stats-grid" style={{marginBottom:'20px'}}>
            <StatCard label="Active Promo Codes" value="3" icon="🎟️" color="#3a7bd5" />
            <StatCard label="Promo Redemptions" value="446" change="+32%" icon="✅" color="#28a745" />
            <StatCard label="Bonus Awarded (INR)" value="Rs.82,400" icon="💎" color="#6f42c1" />
            <StatCard label="Referrals This Month" value="284" change="+12%" icon="🔗" color="#fd7e14" />
          </div>
          <p className="text-muted" style={{textAlign:'center', padding:'40px'}}>Detailed marketing funnel charts coming soon.</p>
        </div>
      )}

      {tab === 'Trending Events' && (
        <div className="card">
          <div className="card-title">Trending Events</div>
          <table><thead><tr><th>Event</th><th>Game</th><th>Contests</th><th>Participants</th><th>Prize Pool</th><th>Status</th></tr></thead>
          <tbody>
            {[
              ['IPL 2024 - MI vs CSK', 'Cricket', 48, 12841, 'Rs.10,00,000', 'Live'],
              ['IPL 2024 - RCB vs KKR', 'Cricket', 36, 9432, 'Rs.5,00,000', 'Upcoming'],
              ['EPL Gameweek 30', 'Football', 12, 2341, 'Rs.1,00,000', 'Live'],
              ['PKL Season 11 Finals', 'Kabaddi', 8, 1204, 'Rs.50,000', 'Upcoming'],
            ].map(([ev,gm,co,pa,pp,st]) => (
              <tr key={ev}>
                <td style={{fontWeight:500}}>{ev}</td>
                <td>{gm}</td>
                <td>{co}</td>
                <td>{pa.toLocaleString()}</td>
                <td style={{fontWeight:600}}>{pp}</td>
                <td><span className={`badge ${st==='Live'?'badge-success':'badge-primary'}`}>{st}</span></td>
              </tr>
            ))}
          </tbody></table>
        </div>
      )}

      {tab === 'Referrals' && (
        <div className="card">
          <div className="card-title">Referral Program</div>
          <div className="stats-grid" style={{marginBottom:'20px'}}>
            <StatCard label="Total Referrals" value="2,841" change="+22%" icon="🔗" color="#3a7bd5" />
            <StatCard label="Successful Referrals" value="1,923" icon="✅" color="#28a745" />
            <StatCard label="Referral Bonus Paid" value="Rs.96,150" icon="💰" color="#fd7e14" />
            <StatCard label="Top Referrer" value="vijay_r (22)" icon="🏆" color="#6f42c1" />
          </div>
          <table><thead><tr><th>Rank</th><th>Username</th><th>Referrals</th><th>Bonus Earned</th></tr></thead>
          <tbody>
            {[['1','vijay_r',22,'Rs.1,100'],['2','priya_s',15,'Rs.750'],['3','arjun_b',11,'Rs.550'],['4','rahul_k',8,'Rs.400'],['5','anita_g',6,'Rs.300']].map(([r,u,ref,b]) => (
              <tr key={r}><td><strong>#{r}</strong></td><td>{u}</td><td>{ref}</td><td style={{fontWeight:600,color:'var(--success)'}}>{b}</td></tr>
            ))}
          </tbody></table>
        </div>
      )}
    </Layout>
  );
}
