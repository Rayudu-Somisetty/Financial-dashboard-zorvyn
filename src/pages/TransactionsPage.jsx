import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import TransactionTable from '../components/Transactions/TransactionTable';
import TransactionForm from '../components/Transactions/TransactionForm';
import { Plus, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMonthlyData, getTotals } from '../data/mockData';
import './TransactionsPage.css';
function exportToCSV(transactions) {
  const headers = ['Date', 'Description', 'Amount', 'Category', 'Type'];
  const rows = transactions.map(t => [
    t.date,
    `"${t.description}"`,
    t.amount,
    t.category,
    t.type,
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function TransactionsPage() {
  const { role, filteredTransactions, transactions, addTransaction, updateTransaction } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const totals = useMemo(() => getTotals(transactions), [transactions]);
  const monthly = useMemo(() => getMonthlyData(transactions), [transactions]);
  const currentMonth = monthly[monthly.length - 1];

  const summaryCards = [
    {
      label: 'Total Balance',
      value: totals.balance,
      tone: totals.balance >= 0 ? 'positive' : 'negative',
    },
    {
      label: 'Monthly Income',
      value: currentMonth?.income || 0,
      tone: 'positive',
    },
    {
      label: 'Monthly Expense',
      value: currentMonth?.expenses || 0,
      tone: 'negative',
    },
  ];

  function handleEdit(tx) {
    setEditTx(tx);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditTx(null);
  }

  function handleDuplicate(tx) {
    const { id, ...base } = tx;
    addTransaction({
      ...base,
      description: `${tx.description} (copy)`,
      date: new Date().toISOString().split('T')[0],
    });
  }

  function handleAddNote(tx, note) {
    updateTransaction({ ...tx, note });
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="tx-summary-row">
        {summaryCards.map((card) => (
          <div key={card.label} className="tx-summary-card glass-card glass-card-interactive">
            <span className="tx-summary-card__label">{card.label}</span>
            <span className={`tx-summary-card__value tx-summary-card__value--${card.tone}`}>
              ${card.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>

      <div className="tx-page-actions">
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          disabled={role !== 'admin'}
          title={role !== 'admin' ? 'Admin access required to modify data' : 'Add transaction'}
        >
          <Plus size={16} />
          Add Transaction
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => exportToCSV(filteredTransactions)}
          disabled={filteredTransactions.length === 0}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true, margin: "-30px" }} 
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      >
        <TransactionTable onEdit={handleEdit} onDuplicate={handleDuplicate} onAddNote={handleAddNote} />
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <TransactionForm transaction={editTx} onClose={handleClose} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
