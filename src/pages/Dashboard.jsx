import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, TrendingUp, DollarSign, ArrowDownCircle, Trophy, Clock, UserPlus, Inbox } from 'lucide-react';
import Layout from '../components/Layout';
import { dashboardStats, chartData } from '../data/mockData';

const COLORS = ['#3a7bd5', '#28a745', '#ffc107', '#dc3545'];
const TABS = [
  { label: 'Overview', icon: '📊' },
  { label: 'User Analytics', icon: '👥' },
  { label: 'User Behaviour', icon: '📈' },
  { label: 'Marketing', icon: '🎯' },
  { label: 'Trending Events', icon: '⭐' },
  { label: 'Referrals', icon: '🔗' },
];

function StatCard({ label, value, change, icon: Icon, color }) {
  return (
    <div className="stat-card">
      <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
        <div style={{ background: color + '18', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={22} color={color} />
        </div>
        {change && <span className={`s-change ${change.startsWith('+') ? 'up' : 'down'}`} style={{ fontSize: '12px', fontWeight: 600 }}>{change}</span>}
      </div>
      <div className="s-label">{label}</div>
      <div className="s-value" style={{ fontSize: '22px', marginTop: '4px' }}>{value}</div>
    </div>
  );
}

const leaderboardData = [
  { rank: 1, username: 'vijay_r', fullName: 'Vijay Reddy', contest: 'IPL Mega Grand League', points: 2841, winnings: 'Rs.1,50,000', wins: 34 },
  { rank: 2, username: 'arjun_b', fullName: 'Arjun Bose', contest: 'IPL Mega Grand League', points: 2690, winnings: 'Rs.75,000', wins: 28 },
  { rank: 3, username: 'priya_s', fullName: 'Priya Sharma', contest: 'IPL Mega Grand League', points: 2580, winnings: 'Rs.50,000', wins: 22 },
  { rank: 4, username: 'rahul_k', fullName: 'Rahul Kumar', contest: 'IPL Mega Grand League', points: 2410, winnings: 'Rs.25,000', wins: 19 },
  { rank: 5, username: 'rakesh_t', fullName: 'Rakesh Tiwari', contest: 'IPL Mega Grand League', points: 2280, winnings: 'Rs.15,000', wins: 15 },
];
const rankBadge = (r) => r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : `#${r}`;

const today = new Date();
const oneMonthAgo = new Date(today); oneMonthAgo.setDate(today.getDate() - 30);
const fmt = d => d.toISOString().slice(0, 10);

export default function Dashboard() {
  const [tab, setTab] = useState('Overview');
  const [dateFrom, setDateFrom] = useState(fmt(oneMonthAgo));
  const [dateTo, setDateTo] = useState(fmt(today));
  const [preset, setPreset] = useState('Last 30 Days');
  const s = dashboardStats;

  return (
    <Layout title="Admin Dashboard">
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700 }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>High-End Analytics & Intelligence</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>
          {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Date Range */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', background: '#fff', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', width: 'fit-content' }}>
        <span style={{ fontSize: '16px' }}>📅</span>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Range:</span>
        <input type="date" className="form-control" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ width: '145px', border: 'none', padding: '4px 8px', fontSize: '13px' }} />
        <span style={{ color: 'var(--text-muted)' }}>to</span>
        <input type="date" className="form-control" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ width: '145px', border: 'none', padding: '4px 8px', fontSize: '13px' }} />
        <select className="form-control" value={preset} onChange={e => setPreset(e.target.value)} style={{ width: '140px', fontSize: '13px' }}>
          <option>Preset</option>
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>Custom</option>
        </select>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--border)', marginBottom: '24px', overflowX: 'auto' }}>
        {TABS.map(t => (
          <div key={t.label} onClick={() => setTab(t.label)} style={{
            padding: '10px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px',
            color: tab === t.label ? '#3a7bd5' : 'var(--text-muted)',
            borderBottom: tab === t.label ? '2px solid #3a7bd5' : '2px solid transparent',
            marginBottom: '-2px',
            background: tab === t.label ? '#f0f6ff' : 'transparent',
            borderRadius: tab === t.label ? '6px 6px 0 0' : '0',
          }}>
            <span>{t.icon}</span>{t.label}
          </div>
        ))}
      </div>

      {tab === 'Overview' && (
        <>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Today's Key Metrics</h3>
            <div className="stats-grid">
              <StatCard label="Total Users" value={s.totalUsers.toLocaleString()} change="+18.2%" icon={Users} color="#3a7bd5" />
              <StatCard label="Active Users" value={s.activeUsers.toLocaleString()} change="+12.1%" icon={TrendingUp} color="#28a745" />
              <StatCard label="Total Deposits" value={'Rs.' + s.totalDeposits.toLocaleString()} change="+23.4%" icon={DollarSign} color="#fd7e14" />
              <StatCard label="Total Withdrawals" value={'Rs.' + s.totalWithdrawals.toLocaleString()} change="+15.7%" icon={ArrowDownCircle} color="#dc3545" />
              <StatCard label="Total Contests" value={s.totalContests.toLocaleString()} change="+8.9%" icon={Trophy} color="#6f42c1" />
              <StatCard label="Pending Withdrawals" value={s.pendingWithdrawals} icon={Clock} color="#ffc107" />
              <StatCard label="New Users Today" value={s.todayNewUsers} icon={UserPlus} color="#17a2b8" />
              <StatCard label="Today Deposits" value={'Rs.' + s.todayDeposits.toLocaleString()} icon={Inbox} color="#20c997" />
            </div>
          </div>

          <div className="grid-2 mt-4">
            <div className="card">
              <div className="card-title">User Growth (6 Months)</div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData.userGrowth}>
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3a7bd5" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3a7bd5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="#3a7bd5" fill="url(#ug)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="card-title">Deposits vs Withdrawals</div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData.depositVsWithdrawal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={v => 'Rs.' + v.toLocaleString()} />
                  <Legend />
                  <Bar dataKey="deposits" name="Deposits" fill="#3a7bd5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="withdrawals" name="Withdrawals" fill="#dc3545" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid-2 mt-4">
            <div className="card">
              <div className="card-title">Game Distribution</div>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={chartData.gameDistribution} cx="50%" cy="50%" outerRadius={90} innerRadius={40} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                    {chartData.gameDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="card-title">Key Stats</div>
              {[['New Registrations', '148'], ['KYC Submissions', '32'], ['Contests Created', '24'], ['Total Deposits', 'Rs.84,320'], ['Withdrawal Requests', '12'], ['Active Sessions', '3,841'], ['Support Tickets', '7']].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center" style={{ padding: '9px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{k}</span>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'User Analytics' && (
        <div className="card">
          <div className="card-title">User Analytics</div>
          <div className="stats-grid" style={{ marginBottom: '24px' }}>
            <StatCard label="New Users (Month)" value="4,821" change="+18.2%" icon={UserPlus} color="#3a7bd5" />
            <StatCard label="Verified Users" value="38,491" icon={Users} color="#28a745" />
            <StatCard label="Pending KYC" value="2,341" icon={Clock} color="#ffc107" />
            <StatCard label="Blocked Users" value="128" icon={Users} color="#dc3545" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData.userGrowth}>
              <defs><linearGradient id="ug2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3a7bd5" stopOpacity={0.2} /><stop offset="95%" stopColor="#3a7bd5" stopOpacity={0} /></linearGradient></defs>
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
            {[['Avg. Session Duration', '8m 24s'], ['Pages per Session', '6.2'], ['Bounce Rate', '24.3%'], ['Return Visitor Rate', '68%'], ['Mobile Users', '74%'], ['Desktop Users', '26%']].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center" style={{ padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">Feature Usage</div>
            {[['Create Contest', 68], ['Join Contest', 54], ['Leaderboard', 38], ['Wallet / Deposit', 24], ['Profile & KYC', 14], ['Referral', 8]].map(([k, v]) => (
              <div key={k} style={{ marginBottom: '14px' }}>
                <div className="flex justify-between" style={{ marginBottom: '5px' }}>
                  <span style={{ fontSize: '13px' }}>{k}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>{v}%</span>
                </div>
                <div style={{ background: '#f0f2f4', borderRadius: '4px', height: '7px' }}>
                  <div style={{ background: 'var(--primary)', height: '100%', borderRadius: '4px', width: v + '%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Marketing' && (
        <div className="card">
          <div className="card-title">Marketing Analytics</div>
          <div className="stats-grid" style={{ marginBottom: '24px' }}>
            <StatCard label="Active Promo Codes" value="3" icon={Trophy} color="#3a7bd5" />
            <StatCard label="Promo Redemptions" value="446" change="+32%" icon={TrendingUp} color="#28a745" />
            <StatCard label="Bonus Awarded" value="Rs.82,400" icon={DollarSign} color="#6f42c1" />
            <StatCard label="Referrals This Month" value="284" change="+12%" icon={Users} color="#fd7e14" />
          </div>
          <table><thead><tr><th>Promo Code</th><th>Used</th><th>Limit</th><th>Utilisation</th><th>Revenue Impact</th></tr></thead>
            <tbody>{[['WELCOME50', 234, 1000, '23.4%', 'Rs.14,400'], ['FLAT100', 89, 500, '17.8%', 'Rs.8,900'], ['NEWUSER', 123, 9999, '1.2%', 'Rs.6,150']].map(([c, u, l, p, r]) => (
              <tr key={c}><td><code style={{ background: '#f0f2f4', padding: '2px 8px', borderRadius: '4px' }}>{c}</code></td><td>{u}</td><td>{l}</td>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ flex: 1, background: '#f0f2f4', borderRadius: '4px', height: '6px' }}><div style={{ background: 'var(--primary)', height: '100%', borderRadius: '4px', width: p }}></div></div><span style={{ fontSize: '12px' }}>{p}</span></div></td>
                <td style={{ fontWeight: 600, color: 'var(--success)' }}>{r}</td></tr>
            ))}</tbody></table>
        </div>
      )}

      {tab === 'Trending Events' && (
        <div className="card">
          <div className="card-title">Trending Events</div>
          <div className="table-wrapper"><table><thead><tr><th>Event</th><th>Game</th><th>Contests</th><th>Participants</th><th>Prize Pool</th><th>Status</th></tr></thead>
            <tbody>{[['IPL 2024 - MI vs CSK', 'Cricket', 48, 12841, 'Rs.10,00,000', 'Live'], ['IPL 2024 - RCB vs KKR', 'Cricket', 36, 9432, 'Rs.5,00,000', 'Upcoming'], ['EPL Gameweek 30', 'Football', 12, 2341, 'Rs.1,00,000', 'Live'], ['PKL Season 11 Finals', 'Kabaddi', 8, 1204, 'Rs.50,000', 'Upcoming'], ['ICC World Cup', 'Cricket', 24, 18400, 'Rs.25,00,000', 'Upcoming']].map(([ev, gm, co, pa, pp, st]) => (
              <tr key={ev}><td style={{ fontWeight: 500 }}>{ev}</td><td>{gm}</td><td>{co}</td><td>{pa.toLocaleString()}</td><td style={{ fontWeight: 600 }}>{pp}</td>
                <td><span className={`badge ${st === 'Live' ? 'badge-success' : 'badge-primary'}`}>{st}</span></td></tr>
            ))}</tbody></table></div>
        </div>
      )}

      {tab === 'Referrals' && (
        <div className="card">
          <div className="card-title">Referral Program</div>
          <div className="stats-grid" style={{ marginBottom: '24px' }}>
            <StatCard label="Total Referrals" value="2,841" change="+22%" icon={Users} color="#3a7bd5" />
            <StatCard label="Successful" value="1,923" icon={TrendingUp} color="#28a745" />
            <StatCard label="Bonus Paid" value="Rs.96,150" icon={DollarSign} color="#fd7e14" />
            <StatCard label="Top Referrer" value="vijay_r (22)" icon={Trophy} color="#6f42c1" />
          </div>
          <div className="table-wrapper"><table><thead><tr><th>Rank</th><th>Username</th><th>Full Name</th><th>Referrals</th><th>Bonus Earned</th></tr></thead>
            <tbody>{leaderboardData.slice(0, 5).map((r, i) => (
              <tr key={r.rank}><td style={{ fontWeight: 700, fontSize: '15px' }}>{rankBadge(i + 1)}</td><td><strong>{r.username}</strong></td><td>{r.fullName}</td><td>{r.wins}</td><td style={{ fontWeight: 700, color: 'var(--success)' }}>Rs.{(r.wins * 50).toLocaleString()}</td></tr>
            ))}</tbody></table></div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '32px', padding: '16px', color: 'var(--text-muted)', fontSize: '12px', borderTop: '1px solid var(--border)' }}>
        <div>© {today.getFullYear()} Admin Dashboard.</div>
        <div>All data is abstracted and anonymized for privacy compliance.</div>
      </div>
    </Layout>
  );
}
