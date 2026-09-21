import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { label: 'Market', icon: '📈', path: '/market' },
  { label: 'Admin Role Management', icon: '🛡️', children: [
    { label: 'Add Role', path: '/admin/add-role' },
    { label: 'Manage Roles', path: '/admin/manage-roles' },
  ]},
  { label: 'Communication', icon: '📢', children: [
    { label: 'Dashboard', path: '/communication' },
    { label: 'Email / Push Notifications', path: '/communication/email-push' },
    { label: 'Project Notifications', path: '/communication/project' },
  ]},
  { label: 'Marketing', icon: '🎯', children: [
    { label: 'Promo Code', path: '/marketing/promo' },
  ]},
  { label: 'User Management', icon: '👥', children: [
    { label: 'Manage User', path: '/users/manage' },
  ]},
  { label: 'Content Management', icon: '📝', children: [
    { label: 'CMS', path: '/content/cms' },
    { label: 'Signup Page Image', path: '/content/signup-image' },
  ]},
  { label: 'Report', icon: '📋', children: [
    { label: 'User Report', path: '/report/user' },
    { label: 'User Deposit Amount', path: '/report/deposit' },
  ]},
  { label: 'Manage Finance', icon: '💰', children: [
    { label: 'Withdrawal List', path: '/finance/withdrawals' },
    { label: 'Transaction List', path: '/finance/transactions' },
    { label: 'Winning Balance', path: '/finance/winning-balance' },
  ]},
  { label: 'Settings', icon: '⚙️', children: [
    { label: 'Manage Avatars', path: '/settings/avatars' },
    { label: 'Payment Management', path: '/settings/payments' },
    { label: 'Manage Games', path: '/settings/games' },
    { label: 'Assets Upload', path: '/settings/assets' },
  ]},
  { label: 'Change Password', icon: '🔑', path: '/change-password' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState({});

  const toggle = (label) => setOpen(o => ({ ...o, [label]: !o[label] }));
  const isActive = (path) => location.pathname === path;
  const isParentActive = (children) => children?.some(c => location.pathname === c.path);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">CJ</div>
        <span>CRICJAM</span>
      </div>
      <ul className="sidebar-nav">
        {menuItems.map(item => (
          <li key={item.label} className="nav-item">
            {item.children ? (
              <>
                <div
                  className={`nav-link ${(open[item.label] || isParentActive(item.children)) ? 'open' : ''} ${isParentActive(item.children) ? 'active' : ''}`}
                  onClick={() => toggle(item.label)}
                >
                  <span style={{fontSize:'16px'}}>{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  <span className="chevron">▶</span>
                </div>
                {(open[item.label] || isParentActive(item.children)) && (
                  <ul className="nav-submenu">
                    {item.children.map(child => (
                      <li key={child.path} className="nav-item">
                        <div
                          className={`nav-link ${isActive(child.path) ? 'active' : ''}`}
                          onClick={() => navigate(child.path)}
                        >
                          <span className="nav-label">{child.label}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <div
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span style={{fontSize:'16px'}}>{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
