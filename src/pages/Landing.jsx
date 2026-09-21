import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const featureCards = [
  {
    title: 'Referral Report',
    desc: 'Track and analyze referral performance across all users.',
    icon: '🔗',
    path: '/report/referral',
  },
  {
    title: 'Dashboard',
    desc: 'Track the real-time insights, trends and performance indicators in an excellent visual representation for informed decision-making.',
    icon: '📊',
    path: '/dashboard',
  },
  {
    title: 'New App Banner',
    desc: 'Highlight recent updates, features, or changes to inform users about the latest offers or promotions.',
    icon: '📱',
    path: '/landing',
  },
  {
    title: 'User Engagement',
    desc: 'Control user access and permissions within the system and get detailed analysis of every registered user.',
    icon: '👥',
    path: '/users/manage',
  },
  {
    title: "What's New",
    desc: 'Inform users about new additions in the application and encourage them to explore new features.',
    icon: '✨',
    path: '/landing',
  },
];

const ctaCards = [
  {
    title: 'Withdrawal Requests',
    desc: 'Check if there are any new withdrawal requests from users.',
    bg: '#2ec4b6',
    path: '/finance/withdrawals',
  },
  {
    title: 'Transaction',
    desc: 'Track all the in-flow and out-flow of various available currencies.',
    bg: '#9b59b6',
    path: '/finance/transactions',
  },
  {
    title: 'Deposits and Withdrawal',
    desc: 'Set the minimum and maximum cap for users when they add or withdraw from their wallet.',
    bg: '#f39c12',
    path: '/settings/deposit-withdrawal',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Layout title="Welcome">
      <div>
        <h1 style={{fontSize:'28px', fontWeight:700, marginBottom:'4px'}}>Welcome Admin</h1>
        <p style={{color:'var(--text-muted)', marginBottom:'28px'}}>What do you want to start with?</p>

        <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:'24px', alignItems:'start'}}>
          {/* Feature Cards */}
          <div>
            {/* First card - Referral Report (full width small) */}
            <div
              onClick={() => navigate(featureCards[0].path)}
              style={{
                background:'#fff', borderRadius:'10px', padding:'20px 24px',
                marginBottom:'16px', border:'1px solid var(--border)',
                cursor:'pointer', display:'flex', alignItems:'center', gap:'16px',
                boxShadow:'0 1px 3px rgba(0,0,0,0.04)', maxWidth:'280px',
              }}
            >
              <div style={{fontSize:'28px'}}>{featureCards[0].icon}</div>
              <div style={{fontWeight:700, fontSize:'16px'}}>{featureCards[0].title}</div>
            </div>

            {/* 2x2 grid for remaining cards */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
              {featureCards.slice(1).map(card => (
                <div key={card.title} style={{
                  background:'#fff', borderRadius:'10px', padding:'24px',
                  border:'1px solid var(--border)', boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px'}}>
                    <h3 style={{fontWeight:700, fontSize:'17px', margin:0, flex:1}}>{card.title}</h3>
                    <div style={{fontSize:'32px', marginLeft:'12px'}}>{card.icon}</div>
                  </div>
                  <p style={{color:'#666', fontSize:'13px', lineHeight:1.6, marginBottom:'16px'}}>{card.desc}</p>
                  <button
                    onClick={() => navigate(card.path)}
                    style={{
                      background:'#e74c3c', color:'#fff', border:'none',
                      borderRadius:'6px', padding:'8px 20px', fontWeight:600,
                      cursor:'pointer', display:'flex', alignItems:'center', gap:'6px',
                    }}
                  >
                    Go <span style={{fontSize:'16px'}}>»</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Cards + Need Help */}
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            {ctaCards.map(card => (
              <div
                key={card.title}
                onClick={() => navigate(card.path)}
                style={{
                  background: card.bg, borderRadius:'10px', padding:'20px 24px',
                  cursor:'pointer', transition:'transform 0.15s',
                }}
              >
                <h3 style={{color:'#fff', fontWeight:700, fontSize:'16px', marginBottom:'6px'}}>{card.title}</h3>
                <p style={{color:'rgba(255,255,255,0.85)', fontSize:'13px', lineHeight:1.5, margin:0}}>{card.desc}</p>
              </div>
            ))}
            {/* Need help */}
            <div style={{background:'#fff', borderRadius:'10px', padding:'20px 24px', border:'1px solid var(--border)', boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
              <h3 style={{fontWeight:700, fontSize:'15px', marginBottom:'8px'}}>Need help?</h3>
              <a href="mailto:support@cricjam.com" style={{color:'#666', fontSize:'13px', textDecoration:'none'}}>support@cricjam.com</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
