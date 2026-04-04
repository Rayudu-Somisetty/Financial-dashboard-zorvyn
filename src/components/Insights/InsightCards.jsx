import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getInsights, getTotals, getCategoryBreakdown } from '../../data/mockData';
import {
  TrendingUp, TrendingDown, PiggyBank, Activity,
  BarChart3, DollarSign, Hash, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import './InsightCards.css';

export default function InsightCards() {
  const { transactions } = useApp();
  const insights = useMemo(() => getInsights(transactions), [transactions]);
  const totals = useMemo(() => getTotals(transactions), [transactions]);

  const cards = [
    {
      title: 'Highest Spending',
      value: insights.highestCategory?.name || 'N/A',
      detail: insights.highestCategory
        ? `$${insights.highestCategory.value.toLocaleString()} total`
        : 'No expenses',
      icon: BarChart3,
      color: insights.highestCategory?.color || '#6b7280',
      emoji: insights.highestCategory?.icon || '📊',
    },
    {
      title: 'Savings Rate',
      value: `${insights.savingsRate}%`,
      detail: insights.savingsRate >= 20 ? 'Great job saving!' : 'Consider saving more',
      icon: PiggyBank,
      color: insights.savingsRate >= 20 ? '#10b981' : '#f59e0b',
      trend: insights.savingsRate >= 20 ? 'positive' : 'warning',
    },
    {
      title: 'Avg. Daily Spend',
      value: `$${insights.avgDailySpend.toLocaleString()}`,
      detail: `Across ${insights.totalTransactions} transactions`,
      icon: Activity,
      color: '#06b6d4',
    },
    {
      title: 'Income vs Expenses',
      value: totals.income > 0 ? `${((totals.expenses / totals.income) * 100).toFixed(0)}%` : 'N/A',
      detail: `$${totals.income.toLocaleString()} in / $${totals.expenses.toLocaleString()} out`,
      icon: DollarSign,
      color: '#8b5cf6',
    },
    {
      title: 'Expense Trend',
      value: insights.expenseChange > 0 ? `+${insights.expenseChange}%` : `${insights.expenseChange}%`,
      detail: 'vs previous month',
      icon: insights.expenseChange > 0 ? TrendingUp : TrendingDown,
      color: insights.expenseChange > 0 ? '#ef4444' : '#10b981',
      trend: insights.expenseChange > 0 ? 'negative' : 'positive',
    },
    {
      title: 'Income Trend',
      value: insights.incomeChange > 0 ? `+${insights.incomeChange}%` : `${insights.incomeChange}%`,
      detail: 'vs previous month',
      icon: insights.incomeChange > 0 ? ArrowUpRight : ArrowDownRight,
      color: insights.incomeChange > 0 ? '#10b981' : '#ef4444',
      trend: insights.incomeChange > 0 ? 'positive' : 'negative',
    },
  ];

  return (
    <div className="grid-insights stagger-children">
      {cards.map(card => (
        <div key={card.title} className="insight-card glass-card glass-card-interactive">
          <div className="insight-card__header">
            <div className="insight-card__icon" style={{ background: `${card.color}15`, color: card.color }}>
              {card.emoji ? <span style={{ fontSize: '1.2rem' }}>{card.emoji}</span> : <card.icon size={20} />}
            </div>
            <span className="insight-card__title">{card.title}</span>
          </div>
          <div className="insight-card__value" style={{ color: card.color }}>
            {card.value}
          </div>
          <p className="insight-card__detail">{card.detail}</p>
        </div>
      ))}
    </div>
  );
}
