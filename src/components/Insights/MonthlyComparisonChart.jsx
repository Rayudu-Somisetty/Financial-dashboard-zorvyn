import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getMonthlyData } from '../../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import '../Dashboard/Charts.css';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="chart-tooltip__value" style={{ color: p.color }}>
          {p.name}: ${p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function MonthlyComparisonChart() {
  const { transactions } = useApp();
  const data = useMemo(() => getMonthlyData(transactions), [transactions]);

  return (
    <div className="chart-card glass-card animate-fade-in-up" style={{ animationDelay: '0.15s', marginTop: 20 }}>
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">Monthly Comparison</h3>
          <p className="chart-card__subtitle">Income vs Expenses per month</p>
        </div>
      </div>
      <div className="chart-card__body">
        {data.length === 0 ? (
          <div className="chart-card__empty">No data available</div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
              <XAxis
                dataKey="label"
                stroke="var(--text-tertiary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--text-tertiary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '0.8rem', paddingTop: '12px' }}
              />
              <Bar
                dataKey="income"
                name="Income"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
