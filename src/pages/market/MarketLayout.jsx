import { useState, useRef, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './market.css';

import MarketDashboard from './MarketDashboard';
import Events from './Events';
import Topics from './Topics';
import Markets from './Markets';
import Spotlight from './Spotlight';
import CryptoMapping from './CryptoMapping';
import CryptoTradingReports from './CryptoTradingReports';
import ParentCategory from './ParentCategory';
import SubCategory from './SubCategory';
import Leagues from './Leagues';
import Competitors from './Competitors';
import EventTopic from './EventTopic';
import CreateTournament from './CreateTournament';
import TournamentList from './TournamentList';
import AddMerchandize from './AddMerchandize';
import PLReport from './PLReport';
import UserReports from './UserReports';
import AppSetting from './AppSetting';
import AMM from './AMM';
import AssetManagement from './AssetManagement';
import BannerManagement from './BannerManagement';
import ReorderMarkets from './ReorderMarkets';
import ReorderTopics from './ReorderTopics';
import CommNewBroadcast from './CommNewBroadcast';
import CommCampaigns from './CommCampaigns';

const navItems = [
  {
    label: 'Dashboard',
    children: [
      { label: 'Game', path: '/market/dashboard/game' },
      { label: 'Market', path: '/market/dashboard' },
    ],
  },
  {
    label: 'Event Management',
    children: [
      { label: 'Events', path: '/market/events' },
      { label: 'Topics', path: '/market/topics' },
      { label: 'Markets', path: '/market/markets' },
      { label: 'Spotlight', path: '/market/spotlight' },
    ],
  },
  {
    label: 'Crypto Module',
    children: [
      { label: 'Mapping and Assets', path: '/market/crypto/mapping' },
      { label: 'Trading Reports', path: '/market/crypto/trading-reports' },
    ],
  },
  {
    label: 'Sports View',
    children: [
      { label: 'Parent Category', path: '/market/sports/parent-category' },
      { label: 'Sub Category', path: '/market/sports/sub-category' },
      { label: 'League/Markets', path: '/market/sports/leagues' },
      { label: 'Competitors', path: '/market/sports/competitors' },
      { label: 'Event/Topic', path: '/market/sports/event-topic' },
    ],
  },
  {
    label: 'Tournament',
    children: [
      { label: 'Create Tournament', path: '/market/tournament/create' },
      { label: 'Tournament List', path: '/market/tournament/list' },
      { label: 'Add Merchandize', path: '/market/tournament/merchandize' },
    ],
  },
  {
    label: 'Reports',
    children: [
      { label: 'P&L Report', path: '/market/reports/pl' },
      { label: 'User Reports', path: '/market/reports/users' },
    ],
  },
  {
    label: 'Communication',
    children: [
      { label: 'New Broadcast', path: '/market/communication/new-broadcast' },
      { label: 'Campaigns', path: '/market/communication/campaigns' },
    ],
  },
  {
    label: 'Settings',
    children: [
      { label: 'App Setting', path: '/market/settings/app' },
      { label: 'AMM', path: '/market/settings/amm' },
      { label: 'Asset Management', path: '/market/settings/assets' },
      { label: 'Banner Management', path: '/market/settings/banners' },
      { label: 'Reorder Markets', path: '/market/settings/reorder-markets' },
      { label: 'Reorder Topics', path: '/market/settings/reorder-topics' },
      { label: 'Revenue Report', path: '/market/reports/pl' },
    ],
  },
];

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const closeTimer = useRef(null);

  const isActive = item.children
    ? item.children.some((c) => location.pathname.startsWith(c.path))
    : location.pathname === item.path;

  const handleChildClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      className="market-nav-item"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        className={`market-nav-btn ${isActive ? 'active' : ''}`}
        onClick={() => setOpen((p) => !p)}
      >
        {item.label}
        {item.children && <span className="arrow">▾</span>}
      </button>
      {item.children && open && (
        <div className="market-dropdown">
          {item.children.map((child) => (
            <button
              key={child.path}
              className="market-dropdown-item"
              onClick={() => handleChildClick(child.path)}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MarketLayout() {
  return (
    <Layout title="Market">
      <div className="market-root" style={{margin:'-24px', minHeight:'calc(100vh - 56px)'}}>
      <nav className="market-navbar">
        <div className="market-nav-items">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>
      </nav>

      <div className="market-content">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<MarketDashboard />} />
          <Route path="dashboard/game" element={<MarketDashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="topics" element={<Topics />} />
          <Route path="markets" element={<Markets />} />
          <Route path="spotlight" element={<Spotlight />} />
          <Route path="crypto/mapping" element={<CryptoMapping />} />
          <Route path="crypto/trading-reports" element={<CryptoTradingReports />} />
          <Route path="sports/parent-category" element={<ParentCategory />} />
          <Route path="sports/sub-category" element={<SubCategory />} />
          <Route path="sports/leagues" element={<Leagues />} />
          <Route path="sports/competitors" element={<Competitors />} />
          <Route path="sports/event-topic" element={<EventTopic />} />
          <Route path="tournament/create" element={<CreateTournament />} />
          <Route path="tournament/list" element={<TournamentList />} />
          <Route path="tournament/merchandize" element={<AddMerchandize />} />
          <Route path="reports/pl" element={<PLReport />} />
          <Route path="reports/users" element={<UserReports />} />
          <Route path="communication/new-broadcast" element={<CommNewBroadcast />} />
          <Route path="communication/campaigns" element={<CommCampaigns />} />
          <Route path="settings/app" element={<AppSetting />} />
          <Route path="settings/amm" element={<AMM />} />
          <Route path="settings/assets" element={<AssetManagement />} />
          <Route path="settings/banners" element={<BannerManagement />} />
          <Route path="settings/reorder-markets" element={<ReorderMarkets />} />
          <Route path="settings/reorder-topics" element={<ReorderTopics />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
    </Layout>
  );
}
