import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { ArrowUpRight, ArrowDownRight, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './RecentTransactions.css';

export default function RecentTransactions() {
  const { transactions } = useApp();

  function getRecurringTrend(tx) {
    const similar = transactions
      .filter(item => item.description === tx.description && item.id !== tx.id)
      .sort((a, b) => b.date.localeCompare(a.date));

    if (!similar.length || similar[0].amount === 0) return null;

    const change = ((tx.amount - similar[0].amount) / similar[0].amount) * 100;
    return {
      direction: change >= 0 ? 'up' : 'down',
      value: Math.abs(change).toFixed(1),
    };
  }

  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="recent-tx glass-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="recent-tx__header">
        <h3 className="recent-tx__title">Recent Transactions</h3>
        <Link className="recent-tx__view-all" to="/transactions">
          View All
          <MoveRight size={14} />
        </Link>
      </div>
      <div className="recent-tx__list">
        {recent.length === 0 ? (
          <p className="recent-tx__empty">No transactions yet</p>
        ) : (
          recent.map(tx => {
            const trend = getRecurringTrend(tx);

            return (
              <div key={tx.id} className="recent-tx__item">
                <div className="recent-tx__icon-wrap">
                  <span className="recent-tx__icon">{CATEGORIES[tx.category]?.icon || '📦'}</span>
                </div>
                <div className="recent-tx__info">
                  <span className="recent-tx__desc">{tx.description}</span>
                  <span className="recent-tx__cat">{tx.category} · {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  {trend && (
                    <span className={`recent-tx__trend recent-tx__trend--${trend.direction}`}>
                      {trend.direction === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {trend.value}% vs previous
                    </span>
                  )}
                </div>
                <div className={`recent-tx__amount recent-tx__amount--${tx.type}`}>
                  {tx.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
