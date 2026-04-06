import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getTotals } from '../../data/mockData';
import { TrendingUp, TrendingDown, Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import './SummaryCards.css';

export default function SummaryCards() {
  const { transactions, setFilter } = useApp();
  const navigate = useNavigate();
  const totals = useMemo(() => getTotals(transactions), [transactions]);

  const cards = [
    {
      title: 'Total Balance',
      value: totals.balance,
      icon: Wallet,
      gradient: 'gradient-primary',
      trend: totals.balance >= 0 ? 'positive' : 'negative',
      filterType: null,
    },
    {
      title: 'Total Income',
      value: totals.income,
      icon: ArrowUpCircle,
      gradient: 'gradient-success',
      trend: 'positive',
      filterType: 'income',
    },
    {
      title: 'Total Expenses',
      value: totals.expenses,
      icon: ArrowDownCircle,
      gradient: 'gradient-danger',
      trend: 'negative',
      filterType: 'expense',
    },
  ];

  function handleCardClick(filterType) {
    if (filterType) {
      setFilter('type', filterType);
    }
    navigate('/transactions');
  }

  return (
    <div className="grid-summary stagger-children">
      {cards.map((card) => (
        <button
          key={card.title}
          className="summary-card glass-card glass-card-interactive"
          onClick={() => handleCardClick(card.filterType)}
          disabled={!card.filterType}
          title={card.filterType ? `View ${card.title.toLowerCase()}` : 'View all transactions'}
        >
          <div className="summary-card__header">
            <span className="summary-card__title">{card.title}</span>
            <div className={`summary-card__icon ${card.gradient}`}>
              <card.icon size={20} />
            </div>
          </div>
          <div className="summary-card__value">
            <span className="summary-card__currency">$</span>
            <span className="summary-card__amount">
              {card.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className={`summary-card__trend summary-card__trend--${card.trend}`}>
            {card.trend === 'positive' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{card.trend === 'positive' ? 'On track' : 'Monitor spending'}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
