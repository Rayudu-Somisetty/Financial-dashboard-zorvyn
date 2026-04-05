import { useLocation } from 'react-router-dom';
import './Header.css';

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Your financial overview at a glance' },
  '/transactions': { title: 'Transactions', subtitle: 'View and manage all your transactions' },
  '/insights': { title: 'Insights', subtitle: 'Understand your spending patterns' },
};

export default function Header() {
  const location = useLocation();
  const page = pageTitles[location.pathname] || pageTitles['/'];

  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">{page.title}</h1>
        <p className="header__subtitle">{page.subtitle}</p>
      </div>
    </header>
  );
}
