import { useState } from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, Users, Trophy } from 'lucide-react';
import Layout from '../components/Layout';

const priceData = [
  {time:'09:00',price:182.4,volume:24000},{time:'09:30',price:184.1,volume:18000},
  {time:'10:00',price:185.1,volume:31000},{time:'10:30',price:183.8,volume:22000},
  {time:'11:00',price:186.2,volume:28000},{time:'11:30',price:188.5,volume:35000},
  {time:'12:00',price:187.3,volume:42000},{time:'12:30',price:189.1,volume:29000},
  {time:'13:00',price:186.5,volume:19000},{time:'13:30',price:190.2,volume:38000},
  {time:'14:00',price:191.3,volume:45000},{time:'14:30',price:189.7,volume:33000},
  {time:'15:00',price:192.1,volume:55000},{time:'15:30',price:193.4,volume:62000},
];
const contestVolumeData = [
  {day:'Mon',contests:124,joinFee:48200},{day:'Tue',contests:98,joinFee:38100},
  {day:'Wed',contests:142,joinFee:56400},{day:'Thu',contests:187,joinFee:74800},
  {day:'Fri',contests:203,joinFee:81200},{day:'Sat',contests:289,joinFee:115600},
  {day:'Sun',contests:312,joinFee:124800},
];
const topContests = [
  { name:'IPL Mega Grand League',fee:'Rs.49',players:48293,prize:'Rs.10,00,000',sport:'Cricket',trend:'+12%'},
  { name:'IPL Head to Head',fee:'Rs.19',players:12841,prize:'Rs.5,00,000',sport:'Cricket',trend:'+8%'},
  { name:'EPL Fantasy Mega',fee:'Rs.29',players:4231,prize:'Rs.1,00,000',sport:'Football',trend:'+24%'},
  { name:'PKL Season Champions',fee:'Rs.9',players:2104,prize:'Rs.50,000',sport:'Kabaddi',trend:'+5%'},
];

export default function Market() {
  const [timeframe, setTimeframe] = useState('Today');

  return (
    <Layout title="Market">
      <div className="page-header">
        <p className="breadcrumb">Home / <span>Market</span></p>
        <div className="flex justify-between items-center">
          <h1>Market Overview</h1>
          <div className="flex gap-2">
            {['Today','Week','Month'].map(t=>(
              <button key={t} className={`btn btn-sm ${timeframe===t?'btn-primary':'btn-outline'}`} onClick={()=>setTimeframe(t)}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="stats-grid" style={{marginBottom:'20px',gridTemplateColumns:'repeat(4,1fr)'}}>
        {[[TrendingUp,'Total Market Cap','Rs.2.84Cr','+4.2%','#28a745'],[DollarSign,'Daily Volume','Rs.84,320','+12.1%','#3a7bd5'],[Trophy,'Active Contests','1,847','+8%','#6f42c1'],[Users,'Active Players','31,204','+6.3%','#fd7e14']]
          .map(([Icon,l,v,c,col])=>(
            <div key={l} className="stat-card">
              <div style={{background:col+'18',borderRadius:'10px',padding:'9px',display:'inline-flex',marginBottom:'10px'}}><Icon size={20} color={col}/></div>
              <div className="s-label">{l}</div>
              <div className="s-value" style={{fontSize:'20px'}}>{v}</div>
              <div className="s-change up" style={{marginTop:'4px'}}>{c} vs yesterday</div>
            </div>
          ))}
      </div>

      <div className="grid-2" style={{marginBottom:'20px'}}>
        <div className="card">
          <div className="flex justify-between items-center" style={{marginBottom:'12px'}}>
            <div className="card-title" style={{marginBottom:0}}>Contest Entry Price Index</div>
            <span style={{fontSize:'20px',fontWeight:800,color:'var(--success)'}}>193.4 <TrendingUp size={16} style={{display:'inline'}}/></span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={priceData}>
              <defs><linearGradient id="price" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3a7bd5" stopOpacity={0.25}/><stop offset="95%" stopColor="#3a7bd5" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="time" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}} domain={['auto','auto']}/>
              <Tooltip/>
              <Area type="monotone" dataKey="price" stroke="#3a7bd5" fill="url(#price)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">Weekly Contest Volume</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={contestVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="day" tick={{fontSize:12}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="contests" name="Contests" fill="#3a7bd5" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center" style={{marginBottom:'16px'}}>
          <div className="card-title" style={{marginBottom:0}}>Top Trending Contests</div>
          <span style={{fontSize:'12px',color:'var(--text-muted)'}}>Updated 2 min ago</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>#</th><th>Contest Name</th><th>Entry Fee</th><th>Players</th><th>Prize Pool</th><th>Sport</th><th>Trend</th></tr></thead>
            <tbody>
              {topContests.map((c,i)=>(
                <tr key={c.name}>
                  <td style={{fontWeight:700,color:'var(--text-muted)'}}>{i+1}</td>
                  <td><strong>{c.name}</strong></td>
                  <td style={{fontWeight:600,color:'var(--primary)'}}>{c.fee}</td>
                  <td>{c.players.toLocaleString()}</td>
                  <td style={{fontWeight:700,color:'var(--success)'}}>{c.prize}</td>
                  <td><span className="badge badge-info">{c.sport}</span></td>
                  <td style={{fontWeight:700,color:'var(--success)'}}>{c.trend} <TrendingUp size={12} style={{display:'inline'}}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
