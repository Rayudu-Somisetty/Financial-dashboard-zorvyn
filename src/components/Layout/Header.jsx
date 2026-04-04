import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Shield, Eye } from 'lucide-react';
import './Header.css';

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Your financial overview at a glance' },
  '/transactions': { title: 'Transactions', subtitle: 'View and manage all your transactions' },
  '/insights': { title: 'Insights', subtitle: 'Understand your spending patterns' },
};

export default function Header() {
  const { role, setRole } = useApp();
  const location = useLocation();
  const page = pageTitles[location.pathname] || pageTitles['/'];

  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">{page.title}</h1>
        <p className="header__subtitle">{page.subtitle}</p>
      </div>

      <div className="header__right">
        <div className="header__role-badge">
          {role === 'admin' ? <Shield size={14} /> : <Eye size={14} />}
          <span>{role === 'admin' ? 'Admin' : 'Viewer'}</span>
        </div>

        <div className="header__avatar">
          <span>AR</span>
        </div>
      </div>
    </header>
  );
}
