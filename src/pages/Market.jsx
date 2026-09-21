import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Layout from '../components/Layout';
const data = [
  { time:'09:00',price:182.4,volume:24000 },{ time:'10:00',price:185.1,volume:31000 },
  { time:'11:00',price:183.8,volume:18000 },{ time:'12:00',price:188.2,volume:42000 },
  { time:'13:00',price:186.5,volume:29000 },{ time:'14:00',price:191.3,volume:38000 },
  { time:'15:00',price:189.7,volume:25000 },{ time:'15:30',price:192.1,volume:55000 },
];
export default function Market() {
  return (
    <Layout title="Market">
      <div className="page-header"><p className="breadcrumb">Home / <span>Market</span></p><h1>Market Overview</h1></div>
      <div className="stats-grid">
        {[['Market Cap','Rs.2.84Cr','+4.2%','📊'],['Daily Volume','Rs.84,320','+12.1%','📈'],['Active Contests','1,847','+8%','🏆'],['Prize Distributed','Rs.19.2L','+18%','💰']].map(([l,v,c,i])=>(
          <div key={l} className="stat-card">
            <div style={{fontSize:'24px',marginBottom:'8px'}}>{i}</div>
            <div className="s-label">{l}</div>
            <div className="s-value">{v}</div>
            <div className="s-change up">{c}</div>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Contest Entry Price Trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="time" tick={{fontSize:12}} /><YAxis tick={{fontSize:12}} /><Tooltip /><Area type="monotone" dataKey="price" stroke="#3a7bd5" fill="#e8f0fd" strokeWidth={2} /></AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">Contest Volume</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="time" tick={{fontSize:12}} /><YAxis tick={{fontSize:12}} /><Tooltip /><Area type="monotone" dataKey="volume" stroke="#28a745" fill="#d4edda" strokeWidth={2} /></AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
