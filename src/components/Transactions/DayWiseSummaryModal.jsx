import { X } from 'lucide-react';
import './DayWiseSummaryModal.css';

export default function DayWiseSummaryModal({ isOpen, onClose, transactions }) {
  if (!isOpen) return null;

  // Calculate day-wise summary
  const dailySummary = {};
  transactions.forEach(t => {
    const date = t.date;
    if (!dailySummary[date]) {
      dailySummary[date] = { income: 0, expenses: 0 };
    }
    if (t.type === 'income') {
      dailySummary[date].income += t.amount;
    } else if (t.type === 'expense') {
      dailySummary[date].expenses += t.amount;
    }
  });

  const sortedDates = Object.keys(dailySummary).sort().reverse();
  let runningBalance = 0;
  const summaryData = sortedDates.map(date => {
    const summary = dailySummary[date];
    const netChange = summary.income - summary.expenses;
    runningBalance += netChange;
    return {
      date,
      income: summary.income,
      expenses: summary.expenses,
      netChange,
      runningBalance,
    };
  });

  return (
    <>
      <div className="dws-modal__backdrop" onClick={onClose} />

      <div className="dws-modal">
        <button
          className="dws-modal__close"
          onClick={onClose}
          aria-label="Close day-wise summary"
        >
          <X size={20} />
        </button>

        <div className="dws-modal__header">
          <h2 className="dws-modal__title">Day-wise Transaction Summary</h2>
        </div>

        <div className="dws-modal__content">
          {summaryData.length === 0 ? (
            <div className="dws-modal__empty">
              <p>No transactions found</p>
            </div>
          ) : (
            <div className="dws-table-wrapper">
              <table className="dws-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th className="dws-table__numeric">Income</th>
                    <th className="dws-table__numeric">Expenses</th>
                    <th className="dws-table__numeric">Net Change</th>
                    <th className="dws-table__numeric">Running Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryData.map((row, idx) => (
                    <tr key={idx} className="dws-table__row">
                      <td className="dws-table__date">{row.date}</td>
                      <td className="dws-table__numeric dws-table__income">
                        {row.income > 0 ? `+$${row.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                      </td>
                      <td className="dws-table__numeric dws-table__expense">
                        {row.expenses > 0 ? `-$${row.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                      </td>
                      <td className={`dws-table__numeric dws-table__net ${row.netChange >= 0 ? 'dws-table__positive' : 'dws-table__negative'}`}>
                        {row.netChange > 0 ? '+' : ''}{row.netChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="dws-table__numeric dws-table__balance">
                        ${row.runningBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
