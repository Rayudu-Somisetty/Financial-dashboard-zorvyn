import { useState } from 'react';
import { useApp } from '../context/AppContext';
import TransactionTable from '../components/Transactions/TransactionTable';
import TransactionForm from '../components/Transactions/TransactionForm';
import { Plus, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const { role, filteredTransactions } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editTx, setEditTx] = useState(null);

  function handleEdit(tx) {
    setEditTx(tx);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditTx(null);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="tx-page-actions" style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={16} />
            Add Transaction
          </button>
        )}
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
        <TransactionTable onEdit={handleEdit} />
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <TransactionForm transaction={editTx} onClose={handleClose} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
