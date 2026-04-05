import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, getCategoryBreakdown } from '../../data/mockData';
import './SpendingInsightDonut.css';

function TooltipCard({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{item.name}</p>
      <p className="chart-tooltip__value" style={{ color: item.payload.color }}>
        ${item.value.toLocaleString()}
      </p>
    </div>
  );
}

export default function SpendingInsightDonut() {
  const { transactions } = useApp();

  const { data, total, foodInsight } = useMemo(() => {
    const sortedMonths = [...new Set(transactions.map(tx => tx.date.slice(0, 7)))].sort();
    const currentMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths[sortedMonths.length - 2];

    const currentExpenses = transactions.filter(
      tx => tx.type === 'expense' && tx.date.startsWith(currentMonth),
    );
    const previousExpenses = transactions.filter(
      tx => tx.type === 'expense' && tx.date.startsWith(previousMonth),
    );

    const currentFood = currentExpenses
      .filter(tx => tx.category === 'Food')
      .reduce((sum, tx) => sum + tx.amount, 0);
    const previousFood = previousExpenses
      .filter(tx => tx.category === 'Food')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const breakdown = getCategoryBreakdown(currentExpenses);
    const monthlyTotal = breakdown.reduce((sum, item) => sum + item.value, 0);

    let insight = 'No month-over-month Food spending comparison available yet.';
    if (previousFood > 0) {
      const change = ((currentFood - previousFood) / previousFood) * 100;
      const formatted = `${Math.abs(change).toFixed(1)}%`;
      insight = change >= 0
        ? `You spent ${formatted} more on Food this month than last.`
        : `You spent ${formatted} less on Food this month than last.`;
    }

    return {
      data: breakdown,
      total: monthlyTotal,
      foodInsight: insight,
    };
  }, [transactions]);

  return (
    <div className="spending-insight glass-card animate-fade-in-up">
      <div className="spending-insight__header">
        <h3>Current Month Spending Mix</h3>
        <p>Category distribution for this month</p>
      </div>

      {data.length === 0 ? (
        <p className="spending-insight__empty">No expense data available this month.</p>
      ) : (
        <div className="spending-insight__content">
          <div className="spending-insight__chart">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={102}
                  stroke="none"
                  paddingAngle={3}
                >
                  {data.map(item => (
                    <Cell key={item.name} fill={item.color || CATEGORIES[item.name]?.color || '#64748b'} />
                  ))}
                </Pie>
                <Tooltip content={<TooltipCard />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="spending-insight__center">
              <span>Total</span>
              <strong>${total.toLocaleString()}</strong>
            </div>
          </div>

          <div className="spending-insight__legend">
            {data.slice(0, 6).map(item => (
              <div key={item.name} className="spending-insight__legend-item">
                <span className="spending-insight__dot" style={{ background: item.color }} />
                <span>{item.name}</span>
                <strong>${item.value.toLocaleString()}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="spending-insight__text">{foodInsight}</p>
    </div>
  );
}
