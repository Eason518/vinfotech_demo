import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '📊', title: 'Dashboard & Analytics', desc: 'Monitor key metrics, user growth, deposits and game performance in real-time.', color: 'linear-gradient(135deg,#3a7bd5,#6f42c1)', path: '/dashboard' },
  { icon: '👥', title: 'User Management', desc: 'Manage users, verify KYC documents and handle flagged accounts.', color: 'linear-gradient(135deg,#28a745,#20c997)', path: '/users/manage' },
  { icon: '💰', title: 'Finance Control', desc: 'Process withdrawals, review transactions and track winning balances.', color: 'linear-gradient(135deg,#fd7e14,#ffc107)', path: '/finance/withdrawals' },
  { icon: '🎯', title: 'Marketing Tools', desc: 'Create and manage promo codes to drive user acquisition and retention.', color: 'linear-gradient(135deg,#dc3545,#e83e8c)', path: '/marketing/promo' },
  { icon: '📢', title: 'Communication', desc: 'Send push notifications and emails to keep users engaged.', color: 'linear-gradient(135deg,#17a2b8,#6610f2)', path: '/communication' },
  { icon: '⚙️', title: 'Platform Settings', desc: 'Configure games, avatars, payment gateways and platform assets.', color: 'linear-gradient(135deg,#6c757d,#343a40)', path: '/settings/games' },
];
const ctas = [
  { icon: '⚡', title: 'Pending Withdrawals', desc: '23 requests awaiting approval', color: '#dc3545', path: '/finance/withdrawals' },
  { icon: '📋', title: 'Pending KYC', desc: '12 documents to review', color: '#fd7e14', path: '/users/manage' },
  { icon: '📈', title: "Today's Stats", desc: '148 new users, Rs.84,320 deposits', color: '#3a7bd5', path: '/dashboard' },
];

export default function Landing() {
  const navigate = useNavigate();
  return (
    <Layout title="Welcome">
      <div className="landing-page" style={{padding:0}}>
        <div className="page-header">
          <h1>Welcome back, Admin!</h1>
          <p>Here is what is happening on your platform today.</p>
        </div>
        <div className="landing-grid">
          <div className="feature-cards">
            {features.map(f => (
              <div key={f.title} className="feature-card" style={{background:f.color}} onClick={() => navigate(f.path)}>
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="cta-cards">
            {ctas.map(c => (
              <div key={c.title} className="cta-card" style={{background:c.color}} onClick={() => navigate(c.path)}>
                <div style={{fontSize:'24px', marginBottom:'8px'}}>{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
