import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, ShieldCheck, Bell, Megaphone,
  Users, FileText, BarChart2, DollarSign, Settings, KeyRound,
  ChevronRight, UserPlus, ListChecks, Mail, BellRing,
  Tag, UserCog, BookOpen, Image, PieChart, Wallet,
  CreditCard, Gamepad2, Upload, ScrollText, Trophy
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Market', icon: TrendingUp, path: '/market' },
  { label: 'Admin Role Management', icon: ShieldCheck, children: [
    { label: 'Add Role', icon: UserPlus, path: '/admin/add-role' },
    { label: 'Manage Roles', icon: ListChecks, path: '/admin/manage-roles' },
  ]},
  { label: 'Communication', icon: Bell, children: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/communication' },
    { label: 'Email / Push Notifications', icon: Mail, path: '/communication/email-push' },
    { label: 'Project Notifications', icon: BellRing, path: '/communication/project' },
  ]},
  { label: 'Marketing', icon: Megaphone, children: [
    { label: 'Promo Code', icon: Tag, path: '/marketing/promo' },
  ]},
  { label: 'User Management', icon: Users, children: [
    { label: 'Manage User', icon: UserCog, path: '/users/manage' },
  ]},
  { label: 'Content Management', icon: FileText, children: [
    { label: 'CMS', icon: BookOpen, path: '/content/cms' },
    { label: 'Signup Page Image', icon: Image, path: '/content/signup-image' },
  ]},
  { label: 'Report', icon: BarChart2, children: [
    { label: 'User Report', icon: PieChart, path: '/report/user' },
    { label: 'User Deposit Amount', icon: Wallet, path: '/report/deposit' },
  ]},
  { label: 'Manage Finance', icon: DollarSign, children: [
    { label: 'Withdrawal List', icon: Wallet, path: '/finance/withdrawals' },
    { label: 'Transaction List', icon: ScrollText, path: '/finance/transactions' },
    { label: 'Winning Balance', icon: Trophy, path: '/finance/winning-balance' },
  ]},
  { label: 'Settings', icon: Settings, children: [
    { label: 'Manage Avatars', icon: Users, path: '/settings/avatars' },
    { label: 'Payment Management', icon: CreditCard, path: '/settings/payments' },
    { label: 'Manage Games', icon: Gamepad2, path: '/settings/games' },
    { label: 'Assets Upload', icon: Upload, path: '/settings/assets' },
  ]},
  { label: 'Change Password', icon: KeyRound, path: '/change-password' },
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
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.label} className="nav-item">
              {item.children ? (
                <>
                  <div
                    className={`nav-link ${(open[item.label] || isParentActive(item.children)) ? 'open' : ''} ${isParentActive(item.children) ? 'active' : ''}`}
                    onClick={() => toggle(item.label)}
                  >
                    <Icon size={16} />
                    <span className="nav-label">{item.label}</span>
                    <ChevronRight size={12} className="chevron" />
                  </div>
                  {(open[item.label] || isParentActive(item.children)) && (
                    <ul className="nav-submenu">
                      {item.children.map(child => {
                        const CIcon = child.icon;
                        return (
                          <li key={child.path} className="nav-item">
                            <div
                              className={`nav-link ${isActive(child.path) ? 'active' : ''}`}
                              onClick={() => navigate(child.path)}
                            >
                              <CIcon size={13} style={{opacity:0.7}} />
                              <span className="nav-label">{child.label}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                <div
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon size={16} />
                  <span className="nav-label">{item.label}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
