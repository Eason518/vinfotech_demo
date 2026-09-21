import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ToastContainer from './components/Toast';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import MarketLayout from './pages/market/MarketLayout';
import ManageUser from './pages/ManageUser';
import WithdrawalList from './pages/finance/WithdrawalList';
import TransactionList from './pages/finance/TransactionList';
import WinningBalance from './pages/finance/WinningBalance';
import ManageGames from './pages/settings/ManageGames';
import ManageAvatars from './pages/settings/ManageAvatars';
import PaymentManagement from './pages/settings/PaymentManagement';
import AssetsUpload from './pages/settings/AssetsUpload';
import PromoCode from './pages/marketing/PromoCode';
import AddRole from './pages/admin/AddRole';
import ManageRoles from './pages/admin/ManageRoles';
import CommDashboard from './pages/communication/CommDashboard';
import EmailPush from './pages/communication/EmailPush';
import ProjectNotification from './pages/communication/ProjectNotification';
import CMS from './pages/content/CMS';
import SignupPageImage from './pages/content/SignupPageImage';
import UserReport from './pages/report/UserReport';
import DepositReport from './pages/report/DepositReport';
import ChangePassword from './pages/ChangePassword';

export default function App() {
  return (
    <HashRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market/*" element={<MarketLayout />} />
        <Route path="/admin/add-role" element={<AddRole />} />
        <Route path="/admin/manage-roles" element={<ManageRoles />} />
        <Route path="/communication" element={<CommDashboard />} />
        <Route path="/communication/email-push" element={<EmailPush />} />
        <Route path="/communication/project" element={<ProjectNotification />} />
        <Route path="/marketing/promo" element={<PromoCode />} />
        <Route path="/users/manage" element={<ManageUser />} />
        <Route path="/content/cms" element={<CMS />} />
        <Route path="/content/signup-image" element={<SignupPageImage />} />
        <Route path="/report/user" element={<UserReport />} />
        <Route path="/report/deposit" element={<DepositReport />} />
        <Route path="/finance/withdrawals" element={<WithdrawalList />} />
        <Route path="/finance/transactions" element={<TransactionList />} />
        <Route path="/finance/winning-balance" element={<WinningBalance />} />
        <Route path="/settings/avatars" element={<ManageAvatars />} />
        <Route path="/settings/payments" element={<PaymentManagement />} />
        <Route path="/settings/games" element={<ManageGames />} />
        <Route path="/settings/assets" element={<AssetsUpload />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}
