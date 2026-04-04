import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './RecentTransactions.css';

export default function RecentTransactions() {
  const { transactions } = useApp();
  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="recent-tx glass-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="recent-tx__header">
        <h3 className="recent-tx__title">Recent Transactions</h3>
      </div>
      <div className="recent-tx__list">
        {recent.length === 0 ? (
          <p className="recent-tx__empty">No transactions yet</p>
        ) : (
          recent.map(tx => (
            <div key={tx.id} className="recent-tx__item">
              <div className="recent-tx__icon-wrap">
                <span className="recent-tx__icon">{CATEGORIES[tx.category]?.icon || '📦'}</span>
              </div>
              <div className="recent-tx__info">
                <span className="recent-tx__desc">{tx.description}</span>
                <span className="recent-tx__cat">{tx.category} · {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className={`recent-tx__amount recent-tx__amount--${tx.type}`}>
                {tx.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
