import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getMonthlyData } from '../../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import './Charts.css';

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

export default function BalanceTrendChart() {
  const { transactions } = useApp();
  const data = useMemo(() => getMonthlyData(transactions), [transactions]);

  return (
    <div className="chart-card glass-card animate-fade-in-up">
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">Balance Trend</h3>
          <p className="chart-card__subtitle">Monthly cumulative balance over time</p>
        </div>
      </div>
      <div className="chart-card__body">
        {data.length === 0 ? (
          <div className="chart-card__empty">No data available</div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="balance"
                name="Balance"
                stroke="#818cf8"
                strokeWidth={3}
                fill="url(#balanceGradient)"
                dot={{ fill: '#818cf8', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
