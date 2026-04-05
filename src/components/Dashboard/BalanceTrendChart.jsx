import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getMonthlyData } from '../../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import './Charts.css';

function LatestDot(props) {
  const { cx, cy, index, payload } = props;
  if (cx == null || cy == null) return null;

  const isCurrent = Boolean(payload?.isCurrent);
  return (
    <g>
      <circle cx={cx} cy={cy} r={isCurrent ? 7 : 4.5} fill="#22d3ee" stroke="#0f172a" strokeWidth={isCurrent ? 2 : 1} />
      {isCurrent && (
        <>
          <circle cx={cx} cy={cy} r={11} fill="transparent" stroke="#22d3ee" strokeWidth={1.5} strokeDasharray="3 2" />
          <text x={cx + 12} y={cy - 10} className="chart-current-label">Current</text>
        </>
      )}
    </g>
  );
}

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
  const data = useMemo(() => {
    const monthly = getMonthlyData(transactions);
    return monthly.map((item, idx) => ({
      ...item,
      isCurrent: idx === monthly.length - 1,
    }));
  }, [transactions]);

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
                stroke="#22d3ee"
                strokeWidth={3}
                fill="url(#balanceGradient)"
                dot={<LatestDot />}
                activeDot={{ r: 7, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
