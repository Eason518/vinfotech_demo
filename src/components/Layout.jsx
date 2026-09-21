import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children, title }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('cj_auth')) navigate('/login');
  }, []);

  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="main-content">
        <Topbar pageTitle={title} />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
