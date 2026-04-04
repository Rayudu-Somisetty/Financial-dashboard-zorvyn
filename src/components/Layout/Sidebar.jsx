import { NavLink, useLocation } from 'react-router-dom';
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
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const { theme, toggleTheme, role, setRole } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
        <div className="sidebar__brand">
          <div className="sidebar__logo">
            <span className="sidebar__logo-icon">Z</span>
          </div>
          {!collapsed && <span className="sidebar__brand-text">Zorvyn</span>}
        </div>

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

          {/* Collapse Toggle */}
          <button
            className="sidebar__collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </aside>

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
