import { useState } from 'react';
import { Search, Bookmark, Activity, SlidersHorizontal } from 'lucide-react';
import Layout from '../components/Layout';

const TABS = ['Trending', 'New', 'Crypto', 'Tech', 'Economy', 'Culture', 'World', 'Bollywood', 'Sports'];
const SUB_TABS = ['All', 'Movie', 'IPO', 'FED Rates', 'Mr.Beast', 'Global Election'];

const events = [
  { id:1, icon:'🔮', color:'#8e44ad', title:'Kraken IPO by __ ?', type:'prediction',
    outcomes:[{label:'Sept 30, 2026', pct:75},{label:'Apr 30, 2027', pct:50}],
    volume:'$40', expiry:'Oct 30, 2027', live:false },
  { id:2, icon:'₿', color:'#f39c12', title:'BTC Up or Down 5m', type:'updown',
    upPayout:'$103.09', downPayout:'$1,250', pct:97, live:true },
  { id:3, icon:'Ξ', color:'#3498db', title:'ETH Up or Down 5m', type:'updown',
    upPayout:'$188.68', downPayout:'$192.31', pct:53, live:true },
  { id:4, icon:'◎', color:'#27ae60', title:'SOL Up or Down 5m', type:'updown',
    upPayout:'$188.68', downPayout:'$188.68', pct:53, live:true },
  { id:5, icon:'✕', color:'#2980b9', title:'XRP Up or Down 5m', type:'updown',
    upPayout:'$188.68', downPayout:'$192.31', pct:53, live:true },
  { id:6, icon:'Ð', color:'#c0392b', title:'DOGE Up or Down 5m', type:'updown',
    upPayout:'$188.68', downPayout:'$188.68', pct:53, live:true },
  { id:7, icon:'🏏', color:'#16a085', title:'India vs Australia - Winner', type:'prediction',
    outcomes:[{label:'India', pct:62},{label:'Australia', pct:38}],
    volume:'$1,240', expiry:'Nov 15, 2026', live:true },
  { id:8, icon:'🌍', color:'#8e44ad', title:'US Election 2028 - Who wins?', type:'prediction',
    outcomes:[{label:'Democrat', pct:55},{label:'Republican', pct:45}],
    volume:'$8,420', expiry:'Nov 3, 2028', live:false },
];

function CirclePercent({ pct, color='#27ae60' }) {
  const r = 20, circ = 2 * Math.PI * r;
  return (
    <div style={{position:'relative',width:52,height:52,flexShrink:0}}>
      <svg width="52" height="52" style={{transform:'rotate(-90deg)'}}>
        <circle cx="26" cy="26" r={r} fill="none" stroke="#eee" strokeWidth="4"/>
        <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} strokeLinecap="round"/>
      </svg>
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <span style={{fontSize:'11px',fontWeight:700,color}}>{pct}%</span>
        <span style={{fontSize:'9px',color:'#666'}}>Up</span>
      </div>
    </div>
  );
}

function EventCard({ ev }) {
  const [voted, setVoted] = useState(null);
  if (ev.type === 'updown') {
    return (
      <div style={{background:'#fff',borderRadius:'10px',padding:'16px',border:'1px solid #eee',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
          <div style={{width:36,height:36,borderRadius:'50%',background:ev.color,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'14px',flexShrink:0}}>{ev.icon}</div>
          <div style={{fontWeight:600,fontSize:'14px',flex:1}}>{ev.title}</div>
          <CirclePercent pct={ev.pct}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'10px'}}>
          <button onClick={()=>setVoted('up')} style={{background:voted==='up'?'#1a7a50':'#e8f8f2',color:voted==='up'?'#fff':'#27ae60',border:'1px solid #27ae60',borderRadius:'6px',padding:'8px',fontWeight:600,cursor:'pointer'}}>Up</button>
          <button onClick={()=>setVoted('down')} style={{background:voted==='down'?'#922b21':'#fdf2f2',color:voted==='down'?'#fff':'#e74c3c',border:'1px solid #e74c3c',borderRadius:'6px',padding:'8px',fontWeight:600,cursor:'pointer'}}>Down</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4px',fontSize:'12px',color:'#666',marginBottom:'10px'}}>
          <div>$100 → <strong>{ev.upPayout}</strong></div>
          <div>$100 → <strong>{ev.downPayout}</strong></div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#e74c3c',display:'inline-block',animation:'pulse 1s infinite'}}></span>
            <span style={{color:'#e74c3c',fontWeight:600}}>LIVE</span>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <Bookmark size={14} color="#999" style={{cursor:'pointer'}}/>
            <span style={{color:'#999',cursor:'pointer'}}>{'</>'}</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{background:'#fff',borderRadius:'10px',padding:'16px',border:'1px solid #eee',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
        <div style={{width:36,height:36,borderRadius:'50%',background:ev.color,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'14px',flexShrink:0}}>{ev.icon}</div>
        <div style={{fontWeight:600,fontSize:'14px',flex:1}}>{ev.title}</div>
      </div>
      {ev.outcomes.map((o,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
          <span style={{fontSize:'13px',flex:1,color:'#444'}}>{o.label}</span>
          <span style={{fontWeight:600,color:'var(--primary)',fontSize:'13px'}}>{o.pct}%</span>
          <button onClick={()=>setVoted(i)} style={{background:voted===i?'#1a7a50':'#e8f8f2',color:voted===i?'#fff':'#27ae60',border:'1px solid #27ae60',borderRadius:'4px',padding:'3px 12px',fontSize:'12px',fontWeight:600,cursor:'pointer'}}>Yes</button>
          <button style={{background:'#fdf2f2',color:'#e74c3c',border:'1px solid #e74c3c',borderRadius:'4px',padding:'3px 12px',fontSize:'12px',fontWeight:600,cursor:'pointer'}}>No</button>
        </div>
      ))}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'10px',fontSize:'12px',color:'#666'}}>
        <span>{ev.volume} Vol | 🕐 {ev.expiry}</span>
        <div style={{display:'flex',gap:'8px'}}>
          {ev.live && <span style={{color:'#e74c3c',fontWeight:600,display:'flex',alignItems:'center',gap:'3px'}}><span style={{width:7,height:7,borderRadius:'50%',background:'#e74c3c',display:'inline-block'}}></span>LIVE</span>}
          <Bookmark size={14} color="#999" style={{cursor:'pointer'}}/>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState('Trending');
  const [subTab, setSubTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = events.filter(e =>
    !search || e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Dashboard">
      {/* Home icon + Activity */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
        <span style={{fontSize:'20px',cursor:'pointer'}} onClick={()=>{}}>🏠</span>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'4px',color:'var(--text-muted)',cursor:'pointer'}}>
            <Activity size={16}/><span style={{fontSize:'13px'}}>Activity</span>
          </div>
          <SlidersHorizontal size={16} color="var(--text-muted)" style={{cursor:'pointer'}}/>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{display:'flex',gap:'0',borderBottom:'2px solid var(--border)',marginBottom:'20px',overflowX:'auto'}}>
        {TABS.map(t=>(
          <div key={t} onClick={()=>setTab(t)} style={{
            padding:'8px 16px',fontWeight:500,fontSize:'14px',cursor:'pointer',whiteSpace:'nowrap',
            color:tab===t?'var(--primary)':'var(--text-muted)',
            borderBottom:tab===t?'2px solid var(--primary)':'2px solid transparent',
            marginBottom:'-2px',display:'flex',alignItems:'center',gap:'4px'
          }}>
            {t==='Trending'&&<span>📈</span>}
            {t}
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{position:'relative',marginBottom:'16px'}}>
        <Search size={15} style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}}/>
        <input className="form-control" style={{paddingLeft:'36px',background:'#f8f9fa'}}
          placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>

      {/* Sub-tabs */}
      <div style={{display:'flex',gap:'8px',marginBottom:'20px',flexWrap:'wrap'}}>
        {SUB_TABS.map(t=>(
          <button key={t} onClick={()=>setSubTab(t)} style={{
            padding:'5px 14px',borderRadius:'20px',fontSize:'13px',fontWeight:500,cursor:'pointer',border:'none',
            background:subTab===t?'var(--primary)':'var(--bg)',
            color:subTab===t?'#fff':'var(--text-muted)',
          }}>{t}</button>
        ))}
      </div>

      {/* Event cards grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
        {filtered.map(ev=><EventCard key={ev.id} ev={ev}/>)}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </Layout>
  );
}
