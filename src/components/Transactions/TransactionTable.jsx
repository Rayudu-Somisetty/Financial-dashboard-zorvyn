import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, Trash2, Edit3 } from 'lucide-react';
import { useState } from 'react';
import './TransactionTable.css';

export default function TransactionTable({ onEdit }) {
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
  const categories = Object.keys(CATEGORIES);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={12} className="sort-icon--inactive" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  return (
    <div className="tx-table-wrap">
      {/* Search & Filters */}
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
          <div className="tx-filters__group">
            <label className="tx-filters__label">Category</label>
            <select
              className="select"
              value={filters.category}
              onChange={e => setFilter('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
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

      {/* Results count */}
      <div className="tx-results-info">
        Showing <strong>{filteredTransactions.length}</strong> transaction{filteredTransactions.length !== 1 ? 's' : ''}
      </div>

      {/* Table */}
      {filteredTransactions.length === 0 ? (
        <div className="tx-empty">
          <div className="tx-empty__icon">📭</div>
          <h3>No transactions found</h3>
          <p>Try adjusting your filters or search query</p>
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
              {filteredTransactions.map(tx => (
                <tr key={tx.id}>
                  <td className="tx-table__date">
                    {new Date(tx.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <div className="tx-table__desc-cell">
                      <span className="tx-table__emoji">{CATEGORIES[tx.category]?.icon || '📦'}</span>
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
                  <td className={`tx-table__amount tx-table__amount--${tx.type}`}>
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
                          className="btn btn-ghost tx-table__delete-btn"
                          onClick={() => deleteTransaction(tx.id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
