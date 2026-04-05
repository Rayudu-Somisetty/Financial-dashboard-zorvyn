import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Sun,
  Moon,
  Shield,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ProfileModal from './ProfileModal';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const { theme, toggleTheme, role, setRole, setFilter } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Rayudu Somi Setty',
    email: 'rayudu.setty@zorvyn.com',
    age: 28,
    role: 'Product Analyst',
    initials: 'RS',
  });
  const navigate = useNavigate();
  const quickSearchRef = useRef(null);

  useEffect(() => {
    function onShortcut(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        quickSearchRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, []);

  function handleQuickSearchSubmit(event) {
    event.preventDefault();
    setFilter('search', quickSearch.trim());
    navigate('/transactions');
  }

  function handleSaveProfile(updatedProfile) {
    setUserProfile(updatedProfile);
  }

  return (
    <>
      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <div className="sidebar__logo">
              <span className="sidebar__logo-icon">Z</span>
            </div>
            {!collapsed && <span className="sidebar__brand-text">Zorvyn</span>}
          </div>
          <button
            className="sidebar__collapse-btn sidebar__collapse-btn--top"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand' : 'Collapse'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {!collapsed && (
          <form className="sidebar__search" onSubmit={handleQuickSearchSubmit}>
            <Search size={15} />
            <input
              ref={quickSearchRef}
              type="text"
              value={quickSearch}
              onChange={(event) => setQuickSearch(event.target.value)}
              placeholder="Quick Search (Ctrl+K)"
              aria-label="Quick Search"
            />
          </form>
        )}

        <nav className="sidebar__nav">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
              title={item.label}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button
            className="sidebar__profile"
            onClick={() => setProfileOpen(true)}
            aria-label="Open profile"
          >
            <div className="sidebar__profile-avatar">{userProfile.initials}</div>
            {!collapsed && (
              <div className="sidebar__profile-meta">
                <strong>{userProfile.name}</strong>
                <span>{userProfile.role}</span>
              </div>
            )}
          </button>

          {/* Role Switcher */}
          <div className="sidebar__role" title="Switch Role">
            <button
              className={`role-toggle ${role === 'admin' ? 'role-toggle--admin' : 'role-toggle--viewer'}`}
              onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
            >
              {role === 'admin' ? <Shield size={16} /> : <Eye size={16} />}
              {!collapsed && <span>{role === 'admin' ? 'Admin' : 'Viewer'}</span>}
            </button>
          </div>

          {/* Theme Toggle */}
          <button className="sidebar__theme-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>
      </aside>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={userProfile}
        onSave={handleSaveProfile}
      />

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button
          className="mobile-nav__link"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span>Theme</span>
        </button>
      </nav>
    </>
  );
}
