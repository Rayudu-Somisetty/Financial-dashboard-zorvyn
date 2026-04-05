import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit3,
  X,
  Split,
  MapPin,
  ReceiptText,
  Copy,
  StickyNote,
  Utensils,
  ShoppingBag,
  Car,
  Clapperboard,
  Zap,
  HeartPulse,
  GraduationCap,
  Home,
  Gift,
  Briefcase,
  Landmark,
  Wallet,
  Laptop,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './TransactionTable.css';

const CATEGORY_ICONS = {
  Salary: Wallet,
  Freelance: Laptop,
  Investments: Landmark,
  Food: Utensils,
  Shopping: ShoppingBag,
  Transport: Car,
  Entertainment: Clapperboard,
  Utilities: Zap,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  Rent: Home,
  Gifts: Gift,
};

function CategoryIcon({ category }) {
  const Icon = CATEGORY_ICONS[category] || Briefcase;
  return <Icon size={16} />;
}

export default function TransactionTable({ onEdit, onDuplicate, onAddNote }) {
  const {
    filteredTransactions,
    filters,
    setFilter,
    resetFilters,
    sortConfig,
    setSort,
    role,
    deleteTransaction,
  } = useApp();

  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const categories = Object.keys(CATEGORIES);
  const selectedCategories = Array.isArray(filters.category)
    ? filters.category
    : (filters.category === 'all' ? [] : [filters.category]);

  const loadingKey = useMemo(
    () => [
      filters.search,
      filters.type,
      filters.dateFrom,
      filters.dateTo,
      selectedCategories.join(','),
      sortConfig.key,
      sortConfig.direction,
      filteredTransactions.length,
    ].join('|'),
    [
      filters.search,
      filters.type,
      filters.dateFrom,
      filters.dateTo,
      selectedCategories,
      sortConfig.key,
      sortConfig.direction,
      filteredTransactions.length,
    ],
  );

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 220);
    return () => clearTimeout(timeout);
  }, [loadingKey]);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={12} className="sort-icon--inactive" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  function toggleCategory(category) {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter(item => item !== category)
      : [...selectedCategories, category];
    setFilter('category', next);
  }

  function handleRowClick(tx, eventTarget) {
    if (eventTarget.closest('button')) return;
    setSelectedTx(tx);
  }

  function handleAddNoteClick(tx) {
    const note = window.prompt('Add a note to this transaction', tx.note || '');
    if (note === null) return;
    onAddNote?.(tx, note.trim());
  }

  const hasActiveFilters = Boolean(
    filters.search ||
    filters.type !== 'all' ||
    filters.dateFrom ||
    filters.dateTo ||
    selectedCategories.length,
  );

  return (
    <div className="tx-table-wrap">
      <div className="tx-sticky-controls">
        <div className="tx-toolbar">
          <div className="tx-search">
            <Search size={16} className="tx-search__icon" />
            <input
              type="text"
              className="input tx-search__input"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={e => setFilter('search', e.target.value)}
            />
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="tx-filters animate-fade-in">
            <div className="tx-filters__group tx-category-picker">
              <label className="tx-filters__label">Categories</label>
              <button
                type="button"
                className="btn btn-secondary tx-category-picker__btn"
                onClick={() => setShowCategoryMenu(prev => !prev)}
              >
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} selected`
                  : 'All Categories'}
              </button>
              {showCategoryMenu && (
                <div className="tx-category-picker__menu">
                  {categories.map(category => (
                    <label key={category} className="tx-category-picker__option">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="tx-filters__group">
              <label className="tx-filters__label">Type</label>
              <select
                className="select"
                value={filters.type}
                onChange={e => setFilter('type', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="tx-filters__group">
              <label className="tx-filters__label">From</label>
              <input
                type="date"
                className="input"
                value={filters.dateFrom}
                onChange={e => setFilter('dateFrom', e.target.value)}
              />
            </div>

            <div className="tx-filters__group">
              <label className="tx-filters__label">To</label>
              <input
                type="date"
                className="input"
                value={filters.dateTo}
                onChange={e => setFilter('dateTo', e.target.value)}
              />
            </div>

            <button className="btn btn-ghost" onClick={resetFilters}>
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className="tx-results-info">
        Showing <strong>{filteredTransactions.length}</strong> transaction{filteredTransactions.length !== 1 ? 's' : ''}
      </div>

      {isLoading ? (
        <div className="tx-table-container tx-table-container--skeleton">
          <div className="tx-skeleton" />
          <div className="tx-skeleton" />
          <div className="tx-skeleton" />
          <div className="tx-skeleton" />
          <div className="tx-skeleton" />
          <div className="tx-skeleton" />
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="tx-empty">
          <svg className="tx-empty__illustration" viewBox="0 0 220 150" role="img" aria-label="No transactions">
            <rect x="16" y="18" width="188" height="114" rx="16" fill="currentColor" opacity="0.08" />
            <path d="M32 42h156v66H32z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M32 44l78 46 78-46" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <circle cx="160" cy="58" r="15" fill="none" stroke="currentColor" strokeWidth="5" />
            <path d="M153 58h14M160 51v14" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <h3>No transactions found</h3>
          <p>Try adjusting your filters or search query.</p>
          {hasActiveFilters && (
            <button className="btn btn-secondary" onClick={resetFilters}>
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="tx-table-container">
          <table className="tx-table">
            <thead>
              <tr>
                <th onClick={() => setSort('date')}>
                  Date <SortIcon column="date" />
                </th>
                <th>Description</th>
                <th onClick={() => setSort('category')}>
                  Category <SortIcon column="category" />
                </th>
                <th onClick={() => setSort('type')}>
                  Type <SortIcon column="type" />
                </th>
                <th onClick={() => setSort('amount')}>
                  Amount <SortIcon column="amount" />
                </th>
                {role === 'admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filteredTransactions.map(tx => (
                  <motion.tr
                    key={tx.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className={selectedTx?.id === tx.id ? 'tx-table__row--selected' : ''}
                    onClick={(event) => handleRowClick(tx, event.target)}
                  >
                  <td className="tx-table__date">
                    {new Date(tx.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <div className="tx-table__desc-cell">
                      <span className="tx-table__emoji"><CategoryIcon category={tx.category} /></span>
                      <span className="tx-table__desc">{tx.description}</span>
                    </div>
                  </td>
                  <td>
                    <span className="tx-table__category">{tx.category}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${tx.type}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`tx-table__amount tx-table__amount--${tx.type} tx-table__amount--mono`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                  {role === 'admin' && (
                    <td>
                      <div className="tx-table__actions">
                        <button
                          className="btn btn-ghost"
                          onClick={() => onEdit(tx)}
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          className="btn btn-ghost"
                          onClick={() => onDuplicate?.(tx)}
                          title="Duplicate"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          className="btn btn-ghost"
                          onClick={() => handleAddNoteClick(tx)}
                          title="Add note"
                        >
                          <StickyNote size={14} />
                        </button>
                        <button
                          className="btn btn-ghost tx-table__delete-btn"
                          onClick={() => deleteTransaction(tx.id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selectedTx && (
          <>
            <motion.div
              className="tx-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
            />
            <motion.aside
              className="tx-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              <div className="tx-drawer__header">
                <h3>Transaction Detail</h3>
                <button className="btn btn-ghost" onClick={() => setSelectedTx(null)}>
                  <X size={16} />
                </button>
              </div>

              <div className="tx-drawer__meta">
                <div>
                  <span className="tx-drawer__label">Description</span>
                  <strong>{selectedTx.description}</strong>
                </div>
                <div>
                  <span className="tx-drawer__label">Category</span>
                  <strong>{selectedTx.category}</strong>
                </div>
                <div>
                  <span className="tx-drawer__label">Date</span>
                  <strong>{new Date(selectedTx.date).toLocaleDateString()}</strong>
                </div>
                <div>
                  <span className="tx-drawer__label">Amount</span>
                  <strong className={`tx-table__amount tx-table__amount--${selectedTx.type}`}>
                    {selectedTx.type === 'income' ? '+' : '-'}${selectedTx.amount.toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="tx-drawer__widgets">
                <div className="tx-drawer__widget">
                  <ReceiptText size={16} />
                  <span>Receipt upload placeholder</span>
                </div>
                <div className="tx-drawer__widget">
                  <MapPin size={16} />
                  <span>Location map preview placeholder</span>
                </div>
              </div>

              {selectedTx.note && (
                <p className="tx-drawer__note">Note: {selectedTx.note}</p>
              )}

              {selectedTx.type === 'expense' && (
                <button className="btn btn-secondary tx-drawer__split-btn">
                  <Split size={16} />
                  Split this expense
                </button>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
