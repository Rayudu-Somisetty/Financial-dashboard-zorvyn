import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getCategoryBreakdown } from '../../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import './Charts.css';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{d.name}</p>
      <p className="chart-tooltip__value" style={{ color: d.payload.color }}>
        ${d.value.toLocaleString()}
      </p>
    </div>
  );
}

function ActiveSliceShape(props) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
}

export default function SpendingBreakdownChart() {
  const { transactions } = useApp();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const data = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);
  const selectedSlice = selectedIndex !== null ? data[selectedIndex] : null;

  function handleSliceClick(_, index, event) {
    event?.stopPropagation?.();
    setSelectedIndex(prev => (prev === index ? null : index));
  }

  function clearSelection() {
    setSelectedIndex(null);
  }

  return (
    <div className="chart-card glass-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">Spending Breakdown</h3>
          <p className="chart-card__subtitle">Expenses by category</p>
        </div>
      </div>
      <div className="chart-card__body spending-layout">
        {data.length === 0 ? (
          <div className="chart-card__empty">No expense data</div>
        ) : (
          <>
            <div className="donut-container" onClick={clearSelection}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    activeIndex={selectedIndex ?? undefined}
                    activeShape={ActiveSliceShape}
                    onClick={handleSliceClick}
                  >
                    {data.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <span className="donut-center__label">
                  {selectedSlice ? selectedSlice.name : 'Total'}
                </span>
                <span
                  className={`donut-center__value ${selectedSlice ? 'donut-center__value--selected' : ''}`}
                  style={selectedSlice ? { color: selectedSlice.color } : undefined}
                >
                  ${selectedSlice ? selectedSlice.value.toLocaleString() : `${(total / 1000).toFixed(1)}k`}
                </span>
              </div>
            </div>
            <div className="spending-legend">
              {data.slice(0, 6).map(item => (
                <div key={item.name} className="spending-legend__item">
                  <div className="spending-legend__top-row">
                    <span className="spending-legend__dot" style={{ background: item.color }} />
                    <span className="spending-legend__name">{item.icon} {item.name}</span>
                    <span className="spending-legend__value">${item.value.toLocaleString()}</span>
                    <span className="spending-legend__pct">{((item.value / total) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="spending-legend__bar-track">
                    <div
                      className="spending-legend__bar-fill"
                      style={{ width: `${(item.value / total) * 100}%`, background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
