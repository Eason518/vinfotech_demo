import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  Users, DollarSign, TrendingUp, CreditCard, ChevronRight,
  MessageSquare, LayoutDashboard, Smartphone, UserCog, Sparkles,
} from 'lucide-react';

const quickAccess = [
  {
    title: 'Referral Report',
    desc: 'View referral performance and payouts',
    icon: Users,
    iconBg: '#dbe4fd',
    iconColor: '#3b5bdb',
    path: '/report/referral',
  },
  {
    title: 'Withdrawal Requests',
    desc: 'Check if there are any new withdrawal requests from users.',
    icon: DollarSign,
    iconBg: '#d2f5ea',
    iconColor: '#16a085',
    path: '/finance/withdrawals',
  },
  {
    title: 'Transaction',
    desc: 'Track all the in-flow and out-flow of various available currencies.',
    icon: TrendingUp,
    iconBg: '#e7e9ee',
    iconColor: '#495057',
    path: '/finance/transactions',
  },
  {
    title: 'Deposits and Withdrawal',
    desc: 'Set the minimum and maximum cap for users when they add or withdraw from their wallet.',
    icon: CreditCard,
    iconBg: '#fdecc8',
    iconColor: '#e8890c',
    path: '/settings/deposit-withdrawal',
  },
];

const getStarted = [
  {
    num: '01',
    title: 'Dashboard',
    desc: 'Track the real-time insights, trends and performance indicators in an excellent visual representation for informed decision-making.',
    icon: LayoutDashboard,
    panelBg: '#dce9fb',
    iconColor: '#3b5bdb',
    path: '/dashboard',
  },
  {
    num: '02',
    title: 'New App Banner',
    desc: 'Highlight recent updates, features, or changes to inform users about the latest offers or promotions.',
    icon: Smartphone,
    panelBg: '#fbdfe7',
    iconColor: '#d6336c',
    path: '/landing',
  },
  {
    num: '03',
    title: 'User Engagement',
    desc: 'Control user access and permissions within the system and get detailed analysis of every registered user.',
    icon: UserCog,
    panelBg: '#d9f5ef',
    iconColor: '#12b886',
    path: '/users/manage',
  },
  {
    num: '04',
    title: "What's New",
    desc: 'Inform users about new additions in the application and encourage them to explore new features.',
    icon: Sparkles,
    panelBg: '#fdf3d0',
    iconColor: '#e8a800',
    path: '/landing',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Layout title="Welcome">
      <div>
        {/* Welcome banner */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '20px', background: 'linear-gradient(120deg, #eef2fd 0%, #f3eefc 50%, #eef6fb 100%)',
          borderRadius: '14px', padding: '28px 32px', marginBottom: '28px',
        }}>
          <div>
            <span style={{
              display: 'inline-block', background: '#dce4fb', color: '#3b5bdb',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px',
              textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px',
              marginBottom: '12px',
            }}>Admin Hub</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>Welcome Admin</h1>
            <p style={{ color: 'var(--text-muted)' }}>What do you want to start with?</p>
          </div>
          <div style={{
            background: '#fff', border: '1px solid #f6c2cb', borderRadius: '10px',
            padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px',
            minWidth: '240px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '8px', background: '#fdeef0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <MessageSquare size={17} color="#e74c3c" />
            </div>
            <div>
              <div style={{ color: '#e74c3c', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px' }}>NEED HELP?</div>
              <a href="mailto:support@admin.com" style={{ color: 'var(--text)', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>support@admin.com</a>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.8px', color: 'var(--text)', textTransform: 'uppercase' }}>Quick Access</h2>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Jump into frequent finance &amp; report tasks</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {quickAccess.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onClick={() => navigate(card.path)}
                style={{
                  background: '#fff', borderRadius: '10px', padding: '20px',
                  border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '9px', background: card.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={card.iconColor} />
                  </div>
                  <ChevronRight size={16} color="#c2c7cf" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>{card.title}</h3>
                <p style={{ color: '#798294', fontSize: '12.5px', lineHeight: 1.5, margin: 0 }}>{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Get Started */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.8px', color: 'var(--text)', textTransform: 'uppercase' }}>Get Started</h2>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Core modules to manage your product</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {getStarted.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.title} style={{
                background: '#fff', borderRadius: '10px', border: '1px solid var(--border)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', overflow: 'hidden',
              }}>
                <div style={{ padding: '22px 24px', flex: 1 }}>
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%', background: '#eef0f3',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '14px',
                  }}>{card.num}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>{card.title}</h3>
                  <p style={{ color: '#798294', fontSize: '13px', lineHeight: 1.6, marginBottom: '18px' }}>{card.desc}</p>
                  <button
                    onClick={() => navigate(card.path)}
                    style={{
                      background: '#3b5bdb', color: '#fff', border: 'none',
                      borderRadius: '6px', padding: '8px 18px', fontWeight: 600, fontSize: '13px',
                      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px',
                    }}
                  >
                    Go <ChevronRight size={14} />
                  </button>
                </div>
                <div style={{
                  width: '130px', flexShrink: 0, background: card.panelBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={46} color={card.iconColor} strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
